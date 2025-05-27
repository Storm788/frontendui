import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a SourceGQLModel item into a state’s sources array and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `sources` array.
 * @param {Object} sourceItem - The item to insert; must have `__typename === "SourceGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateSourceItemInsert = (state, sourceItem, dispatch) => {
    const { __typename } = sourceItem;
    if (__typename === "SourceGQLModel") {
        const { sources, ...others } = state;
        const newStateSourceItems = [...sources, sourceItem];
        const newState = { ...others, sources: newStateSourceItems };
        dispatch(ItemActions.item_update(newState));
    }
};

/**
 * Replaces an existing SourceGQLModel item in a state’s sources array and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `sources` array.
 * @param {Object} sourceItem - The updated item; must have `__typename === "SourceGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateSourceItemUpdate = (state, sourceItem, dispatch) => {
    const { __typename } = sourceItem;
    if (__typename === "SourceGQLModel") {
        const { sources, ...others } = state;
        const newStateSourceItems = sources.map(item =>
            item.id === sourceItem.id ? sourceItem : item
        );
        const newState = { ...others, sources: newStateSourceItems };
        dispatch(ItemActions.item_update(newState));
    }
};

/**
 * Removes a SourceGQLModel item from a state’s sources array by its `id` and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `sources` array.
 * @param {Object} sourceItem - The item to delete; must have `__typename === "SourceGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateSourceItemDelete = (state, sourceItem, dispatch) => {
    const { __typename } = sourceItem;
    if (__typename === "SourceGQLModel") {
        const { sources, ...others } = state;
        const newStateSourceItems = sources.filter(
            item => item.id !== sourceItem.id
        );
        const newState = { ...others, sources: newStateSourceItems };
        dispatch(ItemActions.item_update(newState));
    }
};

const StateSourcesAttributeQuery = `
query StateQueryRead($id: UUID!, $where: SourceInputFilter, $skip: Int, $limit: Int) {
    result: stateById(id: $id) {
        __typename
        id
        sources(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            sourceId
            targetId
            statemachineId
        }
    }
}
`

const StateSourcesAttributeAsyncAction = createAsyncGraphQLAction(
    StateSourcesAttributeQuery,
    processVectorAttributeFromGraphQLResult("sources")
)

/**
 * A component for displaying the `sources` attribute of a state entity.
 *
 * This component checks if the `sources` attribute exists on the `state` object. If `sources` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `sources` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StateSourcesAttribute component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {Array<Object>} [props.state.sources] - An array of source items associated with the state entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the sources array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `sources` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const stateEntity = { 
 *   sources: [
 *     { id: 1, name: "Source Item 1" }, 
 *     { id: 2, name: "Source Item 2" }
 *   ] 
 * };
 * <StateSourcesAttribute state={stateEntity} />
 *
 * @example
 * // With a custom filter:
 * <StateSourcesAttribute 
 *   state={stateEntity}
 *   filter={source => source.name.includes("1")}
 * />
 */
export const StateSourcesAttribute = ({state, filter=Boolean}) => {
    const { sources: unfiltered } = state
    if (typeof unfiltered === 'undefined') return null
    const sources = unfiltered.filter(filter)
    if (sources.length === 0) return null
    return (
        <>
            {sources.map(
                source => <div id={source.id} key={source.id}>
                    {/* <SourceMediumCard source={source} /> */}
                    {/* <SourceLink source={source} /> */}
                    Probably {'<SourceMediumCard source={source} />'} <br />
                    <pre>{JSON.stringify(source, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of source items using `StateSourcesAttribute`.
 *
 * Wraps the `StateSourcesAttribute` component, passing the given `items` as the `sources` attribute
 * on a synthetic `state` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of source items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StateSourcesAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of sources or `null` if none are provided.
 *
 * @example
 * <SourcesVisualiser
 *   items={[
 *     { id: 1, name: "Source 1" },
 *     { id: 2, name: "Source 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const SourcesVisualiser = ({ items, ...props }) => 
    <StateSourcesAttribute {...props} state={{ sources: items }} />

/**
 * Infinite-scrolling component for the `sources` attribute of a state entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `sources` array
 * associated with the provided `state` object. It utilizes `SourcesVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.state - The state entity containing the `sources` array.
 * @param {Array<Object>} [props.state.sources] - (Optional) Preloaded source items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `SourcesVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of sources.
 *
 * @example
 * <StateSourcesAttributeInfinite
 *   state={{
 *     sources: [
 *       { id: 1, name: "Source 1" },
 *       { id: 2, name: "Source 2" }
 *     ]
 *   }}
 * />
 */
export const StateSourcesAttributeInfinite = ({state, actionParams={}, ...props}) => { 
    const {sources} = state

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={SourcesVisualiser} 
            preloadedItems={sources}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StateSourcesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `sources` from a `state` entity.
 *
 * This component uses the `StateSourcesAttributeAsyncAction` to asynchronously fetch
 * the `state.sources` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each source item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.state - The state entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `sources` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered sources or a loading/error placeholder.
 *
 * @example
 * <StateSourcesAttributeLazy state={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StateSourcesAttributeLazy
 *   state={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StateSourcesAttributeLazy = ({state, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StateSourcesAttributeAsyncAction, state, {deferred: true})
    useEffect(() => {
        fetch(state)
    }, [state])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StateSourcesAttribute state={entity} filter={filter} />    
}