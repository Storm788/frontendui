import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a VectorGQLModel item into a studyplanlesson’s vectors array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `vectors` array.
 * @param {Object} vectorItem - The item to insert; must have `__typename === "VectorGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonVectorItemInsert = (studyplanlesson, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = studyplanlesson;
        const newStudyPlanLessonVectorItems = [...vectors, vectorItem];
        const newStudyPlanLesson = { ...others, vectors: newStudyPlanLessonVectorItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Replaces an existing VectorGQLModel item in a studyplanlesson’s vectors array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `vectors` array.
 * @param {Object} vectorItem - The updated item; must have `__typename === "VectorGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonVectorItemUpdate = (studyplanlesson, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = studyplanlesson;
        const newStudyPlanLessonVectorItems = vectors.map(item =>
            item.id === vectorItem.id ? vectorItem : item
        );
        const newStudyPlanLesson = { ...others, vectors: newStudyPlanLessonVectorItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Removes a VectorGQLModel item from a studyplanlesson’s vectors array by its `id` and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `vectors` array.
 * @param {Object} vectorItem - The item to delete; must have `__typename === "VectorGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonVectorItemDelete = (studyplanlesson, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = studyplanlesson;
        const newStudyPlanLessonVectorItems = vectors.filter(
            item => item.id !== vectorItem.id
        );
        const newStudyPlanLesson = { ...others, vectors: newStudyPlanLessonVectorItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

const StudyPlanLessonVectorsAttributeQuery = `
query StudyPlanLessonQueryRead($id: UUID!, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: studyplanlessonById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudyPlanLessonVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyPlanLessonVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

/**
 * A component for displaying the `vectors` attribute of a studyplanlesson entity.
 *
 * This component checks if the `vectors` attribute exists on the `studyplanlesson` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `vectors` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonVectorsAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {Array<Object>} [props.studyplanlesson.vectors] - An array of vector items associated with the studyplanlesson entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the vectors array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `vectors` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const studyplanlessonEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 * <StudyPlanLessonVectorsAttribute studyplanlesson={studyplanlessonEntity} />
 *
 * @example
 * // With a custom filter:
 * <StudyPlanLessonVectorsAttribute 
 *   studyplanlesson={studyplanlessonEntity}
 *   filter={vector => vector.name.includes("1")}
 * />
 */
export const StudyPlanLessonVectorsAttribute = ({studyplanlesson, filter=Boolean}) => {
    const { vectors: unfiltered } = studyplanlesson
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
 * Visualiser component for displaying a list of vector items using `StudyPlanLessonVectorsAttribute`.
 *
 * Wraps the `StudyPlanLessonVectorsAttribute` component, passing the given `items` as the `vectors` attribute
 * on a synthetic `studyplanlesson` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of vector items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StudyPlanLessonVectorsAttribute` (e.g., `filter`).
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
    <StudyPlanLessonVectorsAttribute {...props} studyplanlesson={{ vectors: items }} />

/**
 * Infinite-scrolling component for the `vectors` attribute of a studyplanlesson entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `vectors` array
 * associated with the provided `studyplanlesson` object. It utilizes `VectorsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity containing the `vectors` array.
 * @param {Array<Object>} [props.studyplanlesson.vectors] - (Optional) Preloaded vector items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `VectorsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of vectors.
 *
 * @example
 * <StudyPlanLessonVectorsAttributeInfinite
 *   studyplanlesson={{
 *     vectors: [
 *       { id: 1, name: "Vector 1" },
 *       { id: 2, name: "Vector 2" }
 *     ]
 *   }}
 * />
 */
export const StudyPlanLessonVectorsAttributeInfinite = ({studyplanlesson, actionParams={}, ...props}) => { 
    const {vectors} = studyplanlesson

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={VectorsVisualiser} 
            preloadedItems={vectors}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StudyPlanLessonVectorsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `vectors` from a `studyplanlesson` entity.
 *
 * This component uses the `StudyPlanLessonVectorsAttributeAsyncAction` to asynchronously fetch
 * the `studyplanlesson.vectors` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `vectors` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered vectors or a loading/error placeholder.
 *
 * @example
 * <StudyPlanLessonVectorsAttributeLazy studyplanlesson={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudyPlanLessonVectorsAttributeLazy
 *   studyplanlesson={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudyPlanLessonVectorsAttributeLazy = ({studyplanlesson, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudyPlanLessonVectorsAttributeAsyncAction, studyplanlesson, {deferred: true})
    useEffect(() => {
        fetch(studyplanlesson)
    }, [studyplanlesson])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudyPlanLessonVectorsAttribute studyplanlesson={entity} filter={filter} />    
}