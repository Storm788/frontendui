import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a RoletypeGQLModel item into a state’s roletypes array and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `roletypes` array.
 * @param {Object} roletypeItem - The item to insert; must have `__typename === "RoletypeGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateRoletypeItemInsert = (state, roletypeItem, dispatch) => {
    const { __typename } = roletypeItem;
    if (__typename === "RoletypeGQLModel") {
        const { roletypes, ...others } = state;
        const newStateRoletypeItems = [...roletypes, roletypeItem];
        const newState = { ...others, roletypes: newStateRoletypeItems };
        dispatch(ItemActions.item_update(newState));
    }
};

/**
 * Replaces an existing RoletypeGQLModel item in a state’s roletypes array and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `roletypes` array.
 * @param {Object} roletypeItem - The updated item; must have `__typename === "RoletypeGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateRoletypeItemUpdate = (state, roletypeItem, dispatch) => {
    const { __typename } = roletypeItem;
    if (__typename === "RoletypeGQLModel") {
        const { roletypes, ...others } = state;
        const newStateRoletypeItems = roletypes.map(item =>
            item.id === roletypeItem.id ? roletypeItem : item
        );
        const newState = { ...others, roletypes: newStateRoletypeItems };
        dispatch(ItemActions.item_update(newState));
    }
};

/**
 * Removes a RoletypeGQLModel item from a state’s roletypes array by its `id` and dispatches an update.
 *
 * @param {Object} state - The current state object containing a `roletypes` array.
 * @param {Object} roletypeItem - The item to delete; must have `__typename === "RoletypeGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateRoletypeItemDelete = (state, roletypeItem, dispatch) => {
    const { __typename } = roletypeItem;
    if (__typename === "RoletypeGQLModel") {
        const { roletypes, ...others } = state;
        const newStateRoletypeItems = roletypes.filter(
            item => item.id !== roletypeItem.id
        );
        const newState = { ...others, roletypes: newStateRoletypeItems };
        dispatch(ItemActions.item_update(newState));
    }
};

const StateRoletypesAttributeQuery = `
query StateQueryRead($id: UUID!, $where: RoletypeInputFilter, $skip: Int, $limit: Int) {
    result: stateById(id: $id) {
        __typename
        id
        roletypes(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            categoryId
        }
    }
}
`

const StateRoletypesAttributeAsyncAction = createAsyncGraphQLAction(
    StateRoletypesAttributeQuery,
    processVectorAttributeFromGraphQLResult("roletypes")
)

/**
 * A component for displaying the `roletypes` attribute of a state entity.
 *
 * This component checks if the `roletypes` attribute exists on the `state` object. If `roletypes` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `roletypes` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StateRoletypesAttribute component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {Array<Object>} [props.state.roletypes] - An array of roletype items associated with the state entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the roletypes array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `roletypes` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const stateEntity = { 
 *   roletypes: [
 *     { id: 1, name: "Roletype Item 1" }, 
 *     { id: 2, name: "Roletype Item 2" }
 *   ] 
 * };
 * <StateRoletypesAttribute state={stateEntity} />
 *
 * @example
 * // With a custom filter:
 * <StateRoletypesAttribute 
 *   state={stateEntity}
 *   filter={roletype => roletype.name.includes("1")}
 * />
 */
export const StateRoletypesAttribute = ({state, filter=Boolean}) => {
    const { roletypes: unfiltered } = state
    if (typeof unfiltered === 'undefined') return null
    const roletypes = unfiltered.filter(filter)
    if (roletypes.length === 0) return null
    return (
        <>
            {roletypes.map(
                roletype => <div id={roletype.id} key={roletype.id}>
                    {/* <RoletypeMediumCard roletype={roletype} /> */}
                    {/* <RoletypeLink roletype={roletype} /> */}
                    Probably {'<RoletypeMediumCard roletype={roletype} />'} <br />
                    <pre>{JSON.stringify(roletype, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of roletype items using `StateRoletypesAttribute`.
 *
 * Wraps the `StateRoletypesAttribute` component, passing the given `items` as the `roletypes` attribute
 * on a synthetic `state` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of roletype items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StateRoletypesAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of roletypes or `null` if none are provided.
 *
 * @example
 * <RoletypesVisualiser
 *   items={[
 *     { id: 1, name: "Roletype 1" },
 *     { id: 2, name: "Roletype 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const RoletypesVisualiser = ({ items, ...props }) => 
    <StateRoletypesAttribute {...props} state={{ roletypes: items }} />

/**
 * Infinite-scrolling component for the `roletypes` attribute of a state entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `roletypes` array
 * associated with the provided `state` object. It utilizes `RoletypesVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.state - The state entity containing the `roletypes` array.
 * @param {Array<Object>} [props.state.roletypes] - (Optional) Preloaded roletype items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `RoletypesVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of roletypes.
 *
 * @example
 * <StateRoletypesAttributeInfinite
 *   state={{
 *     roletypes: [
 *       { id: 1, name: "Roletype 1" },
 *       { id: 2, name: "Roletype 2" }
 *     ]
 *   }}
 * />
 */
export const StateRoletypesAttributeInfinite = ({state, actionParams={}, ...props}) => { 
    const {roletypes} = state

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={RoletypesVisualiser} 
            preloadedItems={roletypes}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StateRoletypesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `roletypes` from a `state` entity.
 *
 * This component uses the `StateRoletypesAttributeAsyncAction` to asynchronously fetch
 * the `state.roletypes` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each roletype item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.state - The state entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `roletypes` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered roletypes or a loading/error placeholder.
 *
 * @example
 * <StateRoletypesAttributeLazy state={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StateRoletypesAttributeLazy
 *   state={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StateRoletypesAttributeLazy = ({state, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StateRoletypesAttributeAsyncAction, state, {deferred: true})
    useEffect(() => {
        fetch(state)
    }, [state])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StateRoletypesAttribute state={entity} filter={filter} />    
}