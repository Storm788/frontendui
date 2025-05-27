import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a TargetGQLModel item into a state’s targets array and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `targets` array.
 * @param {Object} targetItem - The item to insert; must have `__typename === "TargetGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateTargetItemInsert = (state, targetItem, dispatch) => {
    const { __typename } = targetItem;
    if (__typename === "TargetGQLModel") {
        const { targets, ...others } = state;
        const newStateTargetItems = [...targets, targetItem];
        const newState = { ...others, targets: newStateTargetItems };
        dispatch(ItemActions.item_update(newState));
    }
};

/**
 * Replaces an existing TargetGQLModel item in a state’s targets array and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `targets` array.
 * @param {Object} targetItem - The updated item; must have `__typename === "TargetGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateTargetItemUpdate = (state, targetItem, dispatch) => {
    const { __typename } = targetItem;
    if (__typename === "TargetGQLModel") {
        const { targets, ...others } = state;
        const newStateTargetItems = targets.map(item =>
            item.id === targetItem.id ? targetItem : item
        );
        const newState = { ...others, targets: newStateTargetItems };
        dispatch(ItemActions.item_update(newState));
    }
};

/**
 * Removes a TargetGQLModel item from a state’s targets array by its `id` and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `targets` array.
 * @param {Object} targetItem - The item to delete; must have `__typename === "TargetGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateTargetItemDelete = (state, targetItem, dispatch) => {
    const { __typename } = targetItem;
    if (__typename === "TargetGQLModel") {
        const { targets, ...others } = state;
        const newStateTargetItems = targets.filter(
            item => item.id !== targetItem.id
        );
        const newState = { ...others, targets: newStateTargetItems };
        dispatch(ItemActions.item_update(newState));
    }
};

const StateTargetsAttributeQuery = `
query StateQueryRead($id: UUID!, $where: TargetInputFilter, $skip: Int, $limit: Int) {
    result: stateById(id: $id) {
        __typename
        id
        targets(skip: $skip, limit: $limit, where: $where) {
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

const StateTargetsAttributeAsyncAction = createAsyncGraphQLAction(
    StateTargetsAttributeQuery,
    processVectorAttributeFromGraphQLResult("targets")
)

/**
 * A component for displaying the `targets` attribute of a state entity.
 *
 * This component checks if the `targets` attribute exists on the `state` object. If `targets` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `targets` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StateTargetsAttribute component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {Array<Object>} [props.state.targets] - An array of target items associated with the state entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the targets array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `targets` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const stateEntity = { 
 *   targets: [
 *     { id: 1, name: "Target Item 1" }, 
 *     { id: 2, name: "Target Item 2" }
 *   ] 
 * };
 * <StateTargetsAttribute state={stateEntity} />
 *
 * @example
 * // With a custom filter:
 * <StateTargetsAttribute 
 *   state={stateEntity}
 *   filter={target => target.name.includes("1")}
 * />
 */
export const StateTargetsAttribute = ({state, filter=Boolean}) => {
    const { targets: unfiltered } = state
    if (typeof unfiltered === 'undefined') return null
    const targets = unfiltered.filter(filter)
    if (targets.length === 0) return null
    return (
        <>
            {targets.map(
                target => <div id={target.id} key={target.id}>
                    {/* <TargetMediumCard target={target} /> */}
                    {/* <TargetLink target={target} /> */}
                    Probably {'<TargetMediumCard target={target} />'} <br />
                    <pre>{JSON.stringify(target, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of target items using `StateTargetsAttribute`.
 *
 * Wraps the `StateTargetsAttribute` component, passing the given `items` as the `targets` attribute
 * on a synthetic `state` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of target items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StateTargetsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of targets or `null` if none are provided.
 *
 * @example
 * <TargetsVisualiser
 *   items={[
 *     { id: 1, name: "Target 1" },
 *     { id: 2, name: "Target 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const TargetsVisualiser = ({ items, ...props }) => 
    <StateTargetsAttribute {...props} state={{ targets: items }} />

/**
 * Infinite-scrolling component for the `targets` attribute of a state entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `targets` array
 * associated with the provided `state` object. It utilizes `TargetsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.state - The state entity containing the `targets` array.
 * @param {Array<Object>} [props.state.targets] - (Optional) Preloaded target items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `TargetsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of targets.
 *
 * @example
 * <StateTargetsAttributeInfinite
 *   state={{
 *     targets: [
 *       { id: 1, name: "Target 1" },
 *       { id: 2, name: "Target 2" }
 *     ]
 *   }}
 * />
 */
export const StateTargetsAttributeInfinite = ({state, actionParams={}, ...props}) => { 
    const {targets} = state

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={TargetsVisualiser} 
            preloadedItems={targets}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StateTargetsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `targets` from a `state` entity.
 *
 * This component uses the `StateTargetsAttributeAsyncAction` to asynchronously fetch
 * the `state.targets` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each target item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.state - The state entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `targets` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered targets or a loading/error placeholder.
 *
 * @example
 * <StateTargetsAttributeLazy state={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StateTargetsAttributeLazy
 *   state={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StateTargetsAttributeLazy = ({state, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StateTargetsAttributeAsyncAction, state, {deferred: true})
    useEffect(() => {
        fetch(state)
    }, [state])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StateTargetsAttribute state={entity} filter={filter} />    
}