import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a VectorGQLModel item into a statemachine’s vectors array and dispatches an update.
 *
 * @param {Object} statemachine - The current statemachine object containing a `vectors` array.
 * @param {Object} vectorItem - The item to insert; must have `__typename === "VectorGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateMachineVectorItemInsert = (statemachine, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = statemachine;
        const newStateMachineVectorItems = [...vectors, vectorItem];
        const newStateMachine = { ...others, vectors: newStateMachineVectorItems };
        dispatch(ItemActions.item_update(newStateMachine));
    }
};

/**
 * Replaces an existing VectorGQLModel item in a statemachine’s vectors array and dispatches an update.
 *
 * @param {Object} statemachine - The current statemachine object containing a `vectors` array.
 * @param {Object} vectorItem - The updated item; must have `__typename === "VectorGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateMachineVectorItemUpdate = (statemachine, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = statemachine;
        const newStateMachineVectorItems = vectors.map(item =>
            item.id === vectorItem.id ? vectorItem : item
        );
        const newStateMachine = { ...others, vectors: newStateMachineVectorItems };
        dispatch(ItemActions.item_update(newStateMachine));
    }
};

/**
 * Removes a VectorGQLModel item from a statemachine’s vectors array by its `id` and dispatches an update.
 *
 * @param {Object} statemachine - The current statemachine object containing a `vectors` array.
 * @param {Object} vectorItem - The item to delete; must have `__typename === "VectorGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStateMachineVectorItemDelete = (statemachine, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = statemachine;
        const newStateMachineVectorItems = vectors.filter(
            item => item.id !== vectorItem.id
        );
        const newStateMachine = { ...others, vectors: newStateMachineVectorItems };
        dispatch(ItemActions.item_update(newStateMachine));
    }
};

const StateMachineVectorsAttributeQuery = `
query StateMachineQueryRead($id: UUID!, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: statemachineById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StateMachineVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    StateMachineVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

/**
 * A component for displaying the `vectors` attribute of a statemachine entity.
 *
 * This component checks if the `vectors` attribute exists on the `statemachine` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `vectors` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StateMachineVectorsAttribute component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {Array<Object>} [props.statemachine.vectors] - An array of vector items associated with the statemachine entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the vectors array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `vectors` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const statemachineEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 * <StateMachineVectorsAttribute statemachine={statemachineEntity} />
 *
 * @example
 * // With a custom filter:
 * <StateMachineVectorsAttribute 
 *   statemachine={statemachineEntity}
 *   filter={vector => vector.name.includes("1")}
 * />
 */
export const StateMachineVectorsAttribute = ({statemachine, filter=Boolean}) => {
    const { vectors: unfiltered } = statemachine
    if (typeof unfiltered === 'undefined') return null
    const vectors = unfiltered.filter(filter)
    if (vectors.length === 0) return null
    return (
        <>
            {vectors.map(
                vector => <div id={vector.id} key={vector.id}>
                    {/* <VectorMediumCard vector={vector} /> */}
                    {/* <VectorLink vector={vector} /> */}
                    Probably {'<VectorMediumCard vector={vector} />'} <br />
                    <pre>{JSON.stringify(vector, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of vector items using `StateMachineVectorsAttribute`.
 *
 * Wraps the `StateMachineVectorsAttribute` component, passing the given `items` as the `vectors` attribute
 * on a synthetic `statemachine` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of vector items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StateMachineVectorsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of vectors or `null` if none are provided.
 *
 * @example
 * <VectorsVisualiser
 *   items={[
 *     { id: 1, name: "Vector 1" },
 *     { id: 2, name: "Vector 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const VectorsVisualiser = ({ items, ...props }) => 
    <StateMachineVectorsAttribute {...props} statemachine={{ vectors: items }} />

/**
 * Infinite-scrolling component for the `vectors` attribute of a statemachine entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `vectors` array
 * associated with the provided `statemachine` object. It utilizes `VectorsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.statemachine - The statemachine entity containing the `vectors` array.
 * @param {Array<Object>} [props.statemachine.vectors] - (Optional) Preloaded vector items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `VectorsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of vectors.
 *
 * @example
 * <StateMachineVectorsAttributeInfinite
 *   statemachine={{
 *     vectors: [
 *       { id: 1, name: "Vector 1" },
 *       { id: 2, name: "Vector 2" }
 *     ]
 *   }}
 * />
 */
export const StateMachineVectorsAttributeInfinite = ({statemachine, actionParams={}, ...props}) => { 
    const {vectors} = statemachine

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={VectorsVisualiser} 
            preloadedItems={vectors}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StateMachineVectorsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `vectors` from a `statemachine` entity.
 *
 * This component uses the `StateMachineVectorsAttributeAsyncAction` to asynchronously fetch
 * the `statemachine.vectors` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.statemachine - The statemachine entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `vectors` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered vectors or a loading/error placeholder.
 *
 * @example
 * <StateMachineVectorsAttributeLazy statemachine={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StateMachineVectorsAttributeLazy
 *   statemachine={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StateMachineVectorsAttributeLazy = ({statemachine, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StateMachineVectorsAttributeAsyncAction, statemachine, {deferred: true})
    useEffect(() => {
        fetch(statemachine)
    }, [statemachine])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StateMachineVectorsAttribute statemachine={entity} filter={filter} />    
}