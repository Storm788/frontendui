import { useCallback } from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * A custom React hook that fetches data via a Redux async action.
 * It supports handling loading states, errors, and allows integration with React Suspense.
 *
 * @function useAsyncAction
 * @param {Function} AsyncAction - A constant Redux async action (thunk) to be dispatched.
 * @param {Object} queryVariables - Initial parameters for the async action (e.g., `{ id: "some-id" }`).
 * @param {Object} [params={ deferred: false, network: true }] - Optional configuration object.
 * @param {boolean} [params.deferred=false] - If true, the hook won't fetch on mount; fetch must be triggered manually.
 * @param {boolean} [params.network=true] - If false, network requests are skipped entirely (no auto-fetch).
 *
 * @returns {Object} Hook return values.
 * @returns {boolean}   return.loading         - Indicates if a fetch operation is currently in progress.
 * @returns {any}       return.error           - The error object if the last fetch failed, or `null` otherwise.
 * @returns {any}       return.entity          - The fetched data from Redux state (or from the last successful dispatch).
 * @returns {any}       return.dispatchResult  - The raw value returned by the last dispatched Redux action.
 * @returns {Function}  return.fetch           - A function to initiate the fetch with optional new parameters.
 * @returns {Function}  return.read            - A Suspense-compatible function that reads the data or throws a promise.
 *
 * @example
 * // Basic Usage (No Suspense)
 * const MyComponent = () => {
 *   const { entity, loading, error, fetch } = useAsyncAction(fetchUserAction, { id: "123" });
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       <h2>User: {entity?.name}</h2>
 *       <button onClick={() => fetch({ id: "456" })}>Fetch Another User</button>
 *     </div>
 *   );
 * };
 *
 * @example
 * // Using Suspense
 * const MySuspenseComponent = () => {
 *   const { read } = useAsyncAction(fetchUserAction, { id: "123" }, { deferred: true });
 *
 *   const data = read(); // Suspense will handle loading and error states.
 *   return <div>User: {data.name}</div>;
 * };
 */
export const useAsyncAction = (AsyncAction, queryVariables, params = { deferred: false, network: true }) => {
    const dispatch = useDispatch();
    const fetchPromise = useRef(false)
    const lastMergedParams = useRef(queryVariables);
    // console.log("useAsyncAction QV", queryVariables, "=> REF", lastMergedParams.current)
    // const items = useSelector((state) => state["items"]);
    const { id } = queryVariables
    // const result = items[id];
    const items = useSelector((state) => {
        // if (!state.items) {
        //     throw new Error(
        //         "Invalid store state: 'items' attribute is missing. Ensure the store state contains 'items' before using useAsyncAction."
        //     );
        // }
        return state.items//[id]
    });
    const result = items[id]
    // if (!items) {
    //     throw new Error(
    //         "Invalid store state: 'items' attribute is missing. Ensure the store state contains 'items' before using useAsyncAction."
    //     );
    // }
    const { deferred, network } = params;
    // const [id] = useState(queryVariables?.id)
    // console.log("useAsyncAction", id, result)
    
    const fetchData = useCallback(async (fetchParams) => {
        // console.log("useAsyncAction.fetchData with", fetchParams)
        const mergedParams = fetchParams
        ? { ...lastMergedParams.current, ...fetchParams }
        : { ...lastMergedParams.current, id };

        if (
            lastMergedParams.current &&
            JSON.stringify(lastMergedParams.current) === JSON.stringify(mergedParams)
        ) {
            if (fetchPromise.current) {
                return fetchPromise.current;
            }
        } else if (fetchPromise.current) {
            await fetchPromise.current;
        }

        lastMergedParams.current = mergedParams;     

        // 1) First setState call: check if we're already loading, otherwise set loading = true.
        setState(prev => {
            if (prev.loading) {
                // Already loading, so bail out. We'll reflect this in `canFetch`.
                return prev; // No changes to state
            }           
            
            // Return the new state with loading = true.
            return {
                ...prev,
                loading: true,
                error: null,
                dispatchResult: null,     // Clear any prior results
            };
        });

        const localFetcher = async (reference) => {
            try {
                // console.log("id", id, "fetchParams", fetchParams, "going to fetch with ", mergedParams)
                // console.log(lastMergedParams.current, "originally", queryVariables, "going to fetch with ", mergedParams)
                const actionResult = await dispatch(AsyncAction(mergedParams));
                // console.log("originally", queryVariables, "finished fetching with ", mergedParams, "got ", actionResult)
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    error: null,
                    dispatchResult: actionResult,
                }));

                //this is a hack,
                //const itemFromStore = items[id] //does not work
                const { id: id_ } = mergedParams
                let itemFromStore = actionResult
                if (id_) {
                    const reader = (dispatch, getState) => {
                        const state = getState()
                        const items = state.items
                        itemFromStore = items[id_]
                    }
                    await dispatch(reader)
                }
                // const itemFromStore = items[id]; // Refetch the item from the store
    
                // console.log("useAction.itemFromStore.id", id)
                // console.log("useAction.itemFromStore.mergedParams", mergedParams)
                // console.log("useAction.itemFromStore", itemFromStore, result, actionResult)
                return itemFromStore || actionResult;
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    error: err,
                    dispatchResult: null,
                }));
                // throw err;
            } finally {
                reference.current = null;
            }
        }
        fetchPromise.current = localFetcher(fetchPromise)
        // console.log("useAsyncAction fetch start while mergedParams", mergedParams)
        
        try {
            return await fetchPromise.current
        } catch {
            return null
        }
        // return 
        // console.log("useAsyncAction fetch end while state", state)
        // console.warn("trying to call fetch while still loading")
    }, [AsyncAction]);

    const [state, setState] = useState({
        loading: !deferred,
        error: null,
        dispatchResult: null,
        // fetch: fetchData,
    })

    useEffect(() => {
        if (network && !deferred) {
            fetchData(queryVariables)
        }
    }, [id, AsyncAction]);

    const read = useCallback(
        async (optionalParams = {}) => {
            const mergedParams = { ...lastMergedParams.current, ...optionalParams };

            if (
                lastMergedParams.current &&
                JSON.stringify(lastMergedParams.current) === JSON.stringify(mergedParams)
            ) {
                if (fetchPromise.current) {
                    throw fetchPromise.current;
                }
            } else {
                if (fetchPromise.current) {
                    await fetchPromise.current;
                }
                throw fetchData(mergedParams);
            }

            if (state.error) {
                throw state.error;
            }
            const itemFromStore = items[id]; // Refetch the item from the store
            return itemFromStore;
        },
        [state.error, fetchData, result]
    );

    // if (state.loading) console.log("loading", queryVariables)
    // if (!state.loading) console.log("loaded", queryVariables, result)
    return {
        ...state,
        fetch: fetchData,
        read,
        // read: resource.read, // Suspense-compatible `read` function
        entity: result,
    };
};


