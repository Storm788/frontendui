import { useEffect, useCallback, useState } from 'react';
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ErrorHandler } from "./ErrorHandler";
import { LoadingSpinner } from "./LoadingSpinner";
import { AsyncComponent } from './AsyncComponent';

/**
 * A React component that renders a set of `<option>` elements based on fetched data.
 *
 * This component works with a parent `Select` component to dynamically update
 * options whenever the fetched data changes or when the `shouldFetch` prop increments.
 * It leverages `MutationObserver` to detect changes in the child elements and trigger
 * the `onChange` event on the parent `Select` component.
 *
 * @function Options
 * @param {Object} props - The props for the Options component.
 * @param {Function} props.asyncAction - A Redux asynchronous action (thunk) used to fetch data.
 * @param {Object} [props.params={}] - Initial parameters for the fetch action.
 * @param {number} [props.shouldFetch=0] - A numeric flag to trigger fetching; options are refetched when this value increments.
 *
 * @returns {JSX.Element} A set of `<option>` elements wrapped in React fragments, along with optional loading or error components.
 *
 * @example
 * // Example usage with a Select component:
 * const MyComponent = () => {
 *   const fetchUserOptions = (params) => async (dispatch) => {
 *     const response = await fetch('/api/users', {
 *       method: 'POST',
 *       body: JSON.stringify(params),
 *     });
 *     const json = await response.json();
 *     return json;
 *   };
 *
 *   const [fetchCount, setFetchCount] = useState(0);
 *   const [selectedValue, setSelectedValue] = useState("");
 *
 *   const handleSelectChange = (e) => {
 *     setSelectedValue(e.target.value);
 *   };
 *
 *   const triggerFetch = () => setFetchCount((prev) => prev + 1);
 *
 *   return (
 *     <div>
 *       <button onClick={triggerFetch}>Refresh Options</button>
 *       <Select label="User Selection" id="user-select" value={selectedValue} onChange={handleSelectChange}>
 *         <Options asyncAction={fetchUserOptions} params={{ role: 'admin' }} shouldFetch={fetchCount} />
 *       </Select>
 *     </div>
 *   );
 * };
 */
export const Options = ({ asyncAction, params = {}, shouldFetch, valueSelector=(option)=>(option?.name || option?.id) }) => {
    const { error, loading, fetch, entity, dispatchResult } = useAsyncAction(asyncAction, params, {deferred: true});
    
    useEffect(() => {
        fetch(params)
    }, [shouldFetch, asyncAction]
    )

    // console.log("Options.params", params)
    let options = []
    if (entity?.id) {
        options = entity?.options || []
    } else {
        const result = dispatchResult?.data?.result
        options = result || []
        // console.log("Options.result", options)
    }
    // console.log("Options", options, entity, dispatchResult)
    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {options.map((option) => (
                <option key={option?.id} value={option?.id}>
                    {valueSelector(option)}
                </option>
            ))}
        </>
    );
};


/**
 * A reusable component for loading and rendering `<option>` elements dynamically.
 *
 * @component
 * @param {Object} props - The props for the `Options` component.
 * @param {Function} props.asyncAction - An async action function to fetch options data. Should return a promise resolving to an object containing an `options` array.
 * @param {Object} [props.params={}] - Parameters to pass to the async action for fetching data.
 * @param {number} [props.shouldFetch=0] - A numeric trigger for re-fetching data. Each change in value re-executes the fetch action.
 *
 * @returns {JSX.Element} A collection of `<option>` elements or loading/error states.
 */
export const Options_ = ({ asyncAction, params = {}, shouldFetch }) => {
    return (
        <AsyncComponent
            asyncAction={asyncAction}
            queryVariables={params}
            propertyName="entity"
            shouldFetch={shouldFetch}
        >
            {({ entity, loading, error }) => {
                const options = entity?.options ||[]
                return (<>
                    {loading && <LoadingSpinner />}
                    {error && <ErrorHandler errors={error} />}
                    {options?.map((option) => (
                        <option key={option?.id} value={option?.id}>
                            {option?.name}
                        </option>
                    ))}
                </>)
            }}
        </AsyncComponent>
    );
};