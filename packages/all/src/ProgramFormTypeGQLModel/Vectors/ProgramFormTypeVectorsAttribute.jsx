import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a VectorGQLModel item into a programformtype’s vectors array and dispatches an update.
 *
 * @param {Object} programformtype - The current programformtype object containing a `vectors` array.
 * @param {Object} vectorItem - The item to insert; must have `__typename === "VectorGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramFormTypeVectorItemInsert = (programformtype, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = programformtype;
        const newProgramFormTypeVectorItems = [...vectors, vectorItem];
        const newProgramFormType = { ...others, vectors: newProgramFormTypeVectorItems };
        dispatch(ItemActions.item_update(newProgramFormType));
    }
};

/**
 * Replaces an existing VectorGQLModel item in a programformtype’s vectors array and dispatches an update.
 *
 * @param {Object} programformtype - The current programformtype object containing a `vectors` array.
 * @param {Object} vectorItem - The updated item; must have `__typename === "VectorGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramFormTypeVectorItemUpdate = (programformtype, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = programformtype;
        const newProgramFormTypeVectorItems = vectors.map(item =>
            item.id === vectorItem.id ? vectorItem : item
        );
        const newProgramFormType = { ...others, vectors: newProgramFormTypeVectorItems };
        dispatch(ItemActions.item_update(newProgramFormType));
    }
};

/**
 * Removes a VectorGQLModel item from a programformtype’s vectors array by its `id` and dispatches an update.
 *
 * @param {Object} programformtype - The current programformtype object containing a `vectors` array.
 * @param {Object} vectorItem - The item to delete; must have `__typename === "VectorGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramFormTypeVectorItemDelete = (programformtype, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = programformtype;
        const newProgramFormTypeVectorItems = vectors.filter(
            item => item.id !== vectorItem.id
        );
        const newProgramFormType = { ...others, vectors: newProgramFormTypeVectorItems };
        dispatch(ItemActions.item_update(newProgramFormType));
    }
};

const ProgramFormTypeVectorsAttributeQuery = `
query ProgramFormTypeQueryRead($id: UUID!, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: programformtypeById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const ProgramFormTypeVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    ProgramFormTypeVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

/**
 * A component for displaying the `vectors` attribute of a programformtype entity.
 *
 * This component checks if the `vectors` attribute exists on the `programformtype` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `vectors` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the ProgramFormTypeVectorsAttribute component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {Array<Object>} [props.programformtype.vectors] - An array of vector items associated with the programformtype entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the vectors array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `vectors` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const programformtypeEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 * <ProgramFormTypeVectorsAttribute programformtype={programformtypeEntity} />
 *
 * @example
 * // With a custom filter:
 * <ProgramFormTypeVectorsAttribute 
 *   programformtype={programformtypeEntity}
 *   filter={vector => vector.name.includes("1")}
 * />
 */
export const ProgramFormTypeVectorsAttribute = ({programformtype, filter=Boolean}) => {
    const { vectors: unfiltered } = programformtype
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
 * Visualiser component for displaying a list of vector items using `ProgramFormTypeVectorsAttribute`.
 *
 * Wraps the `ProgramFormTypeVectorsAttribute` component, passing the given `items` as the `vectors` attribute
 * on a synthetic `programformtype` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of vector items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `ProgramFormTypeVectorsAttribute` (e.g., `filter`).
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
    <ProgramFormTypeVectorsAttribute {...props} programformtype={{ vectors: items }} />

/**
 * Infinite-scrolling component for the `vectors` attribute of a programformtype entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `vectors` array
 * associated with the provided `programformtype` object. It utilizes `VectorsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.programformtype - The programformtype entity containing the `vectors` array.
 * @param {Array<Object>} [props.programformtype.vectors] - (Optional) Preloaded vector items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `VectorsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of vectors.
 *
 * @example
 * <ProgramFormTypeVectorsAttributeInfinite
 *   programformtype={{
 *     vectors: [
 *       { id: 1, name: "Vector 1" },
 *       { id: 2, name: "Vector 2" }
 *     ]
 *   }}
 * />
 */
export const ProgramFormTypeVectorsAttributeInfinite = ({programformtype, actionParams={}, ...props}) => { 
    const {vectors} = programformtype

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={VectorsVisualiser} 
            preloadedItems={vectors}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={ProgramFormTypeVectorsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `vectors` from a `programformtype` entity.
 *
 * This component uses the `ProgramFormTypeVectorsAttributeAsyncAction` to asynchronously fetch
 * the `programformtype.vectors` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.programformtype - The programformtype entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `vectors` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered vectors or a loading/error placeholder.
 *
 * @example
 * <ProgramFormTypeVectorsAttributeLazy programformtype={{ id: "abc123" }} />
 *
 * 
 * @example
 * <ProgramFormTypeVectorsAttributeLazy
 *   programformtype={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const ProgramFormTypeVectorsAttributeLazy = ({programformtype, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(ProgramFormTypeVectorsAttributeAsyncAction, programformtype, {deferred: true})
    useEffect(() => {
        fetch(programformtype)
    }, [programformtype])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <ProgramFormTypeVectorsAttribute programformtype={entity} filter={filter} />    
}