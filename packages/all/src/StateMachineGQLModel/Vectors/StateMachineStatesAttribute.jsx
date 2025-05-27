import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a StateGQLModel item into a statemachine’s states array and dispatches an update.
 *
 * @param {Object} statemachine - The current statemachine object containing a `states` array.
 * @param {Object} stateItem - The item to insert; must have `__typename === "StateGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateMachineStateItemInsert = (statemachine, stateItem, dispatch) => {
    const { __typename } = stateItem;
    if (__typename === "StateGQLModel") {
        const { states, ...others } = statemachine;
        const newStateMachineStateItems = [...states, stateItem];
        const newStateMachine = { ...others, states: newStateMachineStateItems };
        dispatch(ItemActions.item_update(newStateMachine));
    }
};

/**
 * Replaces an existing StateGQLModel item in a statemachine’s states array and dispatches an update.
 *
 * @param {Object} statemachine - The current statemachine object containing a `states` array.
 * @param {Object} stateItem - The updated item; must have `__typename === "StateGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateMachineStateItemUpdate = (statemachine, stateItem, dispatch) => {
    const { __typename } = stateItem;
    if (__typename === "StateGQLModel") {
        const { states, ...others } = statemachine;
        const newStateMachineStateItems = states.map(item =>
            item.id === stateItem.id ? stateItem : item
        );
        const newStateMachine = { ...others, states: newStateMachineStateItems };
        dispatch(ItemActions.item_update(newStateMachine));
    }
};

/**
 * Removes a StateGQLModel item from a statemachine’s states array by its `id` and dispatches an update.
 *
 * @param {Object} statemachine - The current statemachine object containing a `states` array.
 * @param {Object} stateItem - The item to delete; must have `__typename === "StateGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateMachineStateItemDelete = (statemachine, stateItem, dispatch) => {
    const { __typename } = stateItem;
    if (__typename === "StateGQLModel") {
        const { states, ...others } = statemachine;
        const newStateMachineStateItems = states.filter(
            item => item.id !== stateItem.id
        );
        const newStateMachine = { ...others, states: newStateMachineStateItems };
        dispatch(ItemActions.item_update(newStateMachine));
    }
};

const StateMachineStatesAttributeQuery = `
query StateMachineQueryRead($id: UUID!, $where: StateInputFilter, $skip: Int, $limit: Int) {
    result: statemachineById(id: $id) {
        __typename
        id
        states(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            statemachineId
            writerslistId
            readerslistId
        }
    }
}
`

const StateMachineStatesAttributeAsyncAction = createAsyncGraphQLAction(
    StateMachineStatesAttributeQuery,
    processVectorAttributeFromGraphQLResult("states")
)

/**
 * A component for displaying the `states` attribute of a statemachine entity.
 *
 * This component checks if the `states` attribute exists on the `statemachine` object. If `states` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `states` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StateMachineStatesAttribute component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {Array<Object>} [props.statemachine.states] - An array of state items associated with the statemachine entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the states array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `states` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const statemachineEntity = { 
 *   states: [
 *     { id: 1, name: "State Item 1" }, 
 *     { id: 2, name: "State Item 2" }
 *   ] 
 * };
 * <StateMachineStatesAttribute statemachine={statemachineEntity} />
 *
 * @example
 * // With a custom filter:
 * <StateMachineStatesAttribute 
 *   statemachine={statemachineEntity}
 *   filter={state => state.name.includes("1")}
 * />
 */
export const StateMachineStatesAttribute = ({statemachine, filter=Boolean}) => {
    const { states: unfiltered } = statemachine
    if (typeof unfiltered === 'undefined') return null
    const states = unfiltered.filter(filter)
    if (states.length === 0) return null
    return (
        <>
            {states.map(
                state => <div id={state.id} key={state.id}>
                    {/* <StateMediumCard state={state} /> */}
                    {/* <StateLink state={state} /> */}
                    Probably {'<StateMediumCard state={state} />'} <br />
                    <pre>{JSON.stringify(state, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of state items using `StateMachineStatesAttribute`.
 *
 * Wraps the `StateMachineStatesAttribute` component, passing the given `items` as the `states` attribute
 * on a synthetic `statemachine` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of state items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StateMachineStatesAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of states or `null` if none are provided.
 *
 * @example
 * <StatesVisualiser
 *   items={[
 *     { id: 1, name: "State 1" },
 *     { id: 2, name: "State 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const StatesVisualiser = ({ items, ...props }) => 
    <StateMachineStatesAttribute {...props} statemachine={{ states: items }} />

/**
 * Infinite-scrolling component for the `states` attribute of a statemachine entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `states` array
 * associated with the provided `statemachine` object. It utilizes `StatesVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.statemachine - The statemachine entity containing the `states` array.
 * @param {Array<Object>} [props.statemachine.states] - (Optional) Preloaded state items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `StatesVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of states.
 *
 * @example
 * <StateMachineStatesAttributeInfinite
 *   statemachine={{
 *     states: [
 *       { id: 1, name: "State 1" },
 *       { id: 2, name: "State 2" }
 *     ]
 *   }}
 * />
 */
export const StateMachineStatesAttributeInfinite = ({statemachine, actionParams={}, ...props}) => { 
    const {states} = statemachine

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={StatesVisualiser} 
            preloadedItems={states}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StateMachineStatesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `states` from a `statemachine` entity.
 *
 * This component uses the `StateMachineStatesAttributeAsyncAction` to asynchronously fetch
 * the `statemachine.states` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each state item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.statemachine - The statemachine entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `states` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered states or a loading/error placeholder.
 *
 * @example
 * <StateMachineStatesAttributeLazy statemachine={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StateMachineStatesAttributeLazy
 *   statemachine={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StateMachineStatesAttributeLazy = ({statemachine, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StateMachineStatesAttributeAsyncAction, statemachine, {deferred: true})
    useEffect(() => {
        fetch(statemachine)
    }, [statemachine])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StateMachineStatesAttribute statemachine={entity} filter={filter} />    
}