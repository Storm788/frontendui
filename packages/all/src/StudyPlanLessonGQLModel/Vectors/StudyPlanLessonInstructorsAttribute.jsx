import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a InstructorGQLModel item into a studyplanlesson’s instructors array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `instructors` array.
 * @param {Object} instructorItem - The item to insert; must have `__typename === "InstructorGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonInstructorItemInsert = (studyplanlesson, instructorItem, dispatch) => {
    const { __typename } = instructorItem;
    if (__typename === "InstructorGQLModel") {
        const { instructors, ...others } = studyplanlesson;
        const newStudyPlanLessonInstructorItems = [...instructors, instructorItem];
        const newStudyPlanLesson = { ...others, instructors: newStudyPlanLessonInstructorItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Replaces an existing InstructorGQLModel item in a studyplanlesson’s instructors array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `instructors` array.
 * @param {Object} instructorItem - The updated item; must have `__typename === "InstructorGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonInstructorItemUpdate = (studyplanlesson, instructorItem, dispatch) => {
    const { __typename } = instructorItem;
    if (__typename === "InstructorGQLModel") {
        const { instructors, ...others } = studyplanlesson;
        const newStudyPlanLessonInstructorItems = instructors.map(item =>
            item.id === instructorItem.id ? instructorItem : item
        );
        const newStudyPlanLesson = { ...others, instructors: newStudyPlanLessonInstructorItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Removes a InstructorGQLModel item from a studyplanlesson’s instructors array by its `id` and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `instructors` array.
 * @param {Object} instructorItem - The item to delete; must have `__typename === "InstructorGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonInstructorItemDelete = (studyplanlesson, instructorItem, dispatch) => {
    const { __typename } = instructorItem;
    if (__typename === "InstructorGQLModel") {
        const { instructors, ...others } = studyplanlesson;
        const newStudyPlanLessonInstructorItems = instructors.filter(
            item => item.id !== instructorItem.id
        );
        const newStudyPlanLesson = { ...others, instructors: newStudyPlanLessonInstructorItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

const StudyPlanLessonInstructorsAttributeQuery = `
query StudyPlanLessonQueryRead($id: UUID!, $where: InstructorInputFilter, $skip: Int, $limit: Int) {
    result: studyplanlessonById(id: $id) {
        __typename
        id
        instructors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            startdate
            enddate
            typeId
        }
    }
}
`

const StudyPlanLessonInstructorsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyPlanLessonInstructorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("instructors")
)

/**
 * A component for displaying the `instructors` attribute of a studyplanlesson entity.
 *
 * This component checks if the `instructors` attribute exists on the `studyplanlesson` object. If `instructors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `instructors` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonInstructorsAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {Array<Object>} [props.studyplanlesson.instructors] - An array of instructor items associated with the studyplanlesson entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the instructors array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `instructors` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const studyplanlessonEntity = { 
 *   instructors: [
 *     { id: 1, name: "Instructor Item 1" }, 
 *     { id: 2, name: "Instructor Item 2" }
 *   ] 
 * };
 * <StudyPlanLessonInstructorsAttribute studyplanlesson={studyplanlessonEntity} />
 *
 * @example
 * // With a custom filter:
 * <StudyPlanLessonInstructorsAttribute 
 *   studyplanlesson={studyplanlessonEntity}
 *   filter={instructor => instructor.name.includes("1")}
 * />
 */
export const StudyPlanLessonInstructorsAttribute = ({studyplanlesson, filter=Boolean}) => {
    const { instructors: unfiltered } = studyplanlesson
    if (typeof unfiltered === 'undefined') return null
    const instructors = unfiltered.filter(filter)
    if (instructors.length === 0) return null
    return (
        <>
            {instructors.map(
                instructor => <div id={instructor.id} key={instructor.id}>
                    {/* <InstructorMediumCard instructor={instructor} /> */}
                    {/* <InstructorLink instructor={instructor} /> */}
                    Probably {'<InstructorMediumCard instructor={instructor} />'} <br />
                    <pre>{JSON.stringify(instructor, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of instructor items using `StudyPlanLessonInstructorsAttribute`.
 *
 * Wraps the `StudyPlanLessonInstructorsAttribute` component, passing the given `items` as the `instructors` attribute
 * on a synthetic `studyplanlesson` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of instructor items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StudyPlanLessonInstructorsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of instructors or `null` if none are provided.
 *
 * @example
 * <InstructorsVisualiser
 *   items={[
 *     { id: 1, name: "Instructor 1" },
 *     { id: 2, name: "Instructor 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const InstructorsVisualiser = ({ items, ...props }) => 
    <StudyPlanLessonInstructorsAttribute {...props} studyplanlesson={{ instructors: items }} />

/**
 * Infinite-scrolling component for the `instructors` attribute of a studyplanlesson entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `instructors` array
 * associated with the provided `studyplanlesson` object. It utilizes `InstructorsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity containing the `instructors` array.
 * @param {Array<Object>} [props.studyplanlesson.instructors] - (Optional) Preloaded instructor items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `InstructorsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of instructors.
 *
 * @example
 * <StudyPlanLessonInstructorsAttributeInfinite
 *   studyplanlesson={{
 *     instructors: [
 *       { id: 1, name: "Instructor 1" },
 *       { id: 2, name: "Instructor 2" }
 *     ]
 *   }}
 * />
 */
export const StudyPlanLessonInstructorsAttributeInfinite = ({studyplanlesson, actionParams={}, ...props}) => { 
    const {instructors} = studyplanlesson

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={InstructorsVisualiser} 
            preloadedItems={instructors}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StudyPlanLessonInstructorsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `instructors` from a `studyplanlesson` entity.
 *
 * This component uses the `StudyPlanLessonInstructorsAttributeAsyncAction` to asynchronously fetch
 * the `studyplanlesson.instructors` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each instructor item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `instructors` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered instructors or a loading/error placeholder.
 *
 * @example
 * <StudyPlanLessonInstructorsAttributeLazy studyplanlesson={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudyPlanLessonInstructorsAttributeLazy
 *   studyplanlesson={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudyPlanLessonInstructorsAttributeLazy = ({studyplanlesson, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudyPlanLessonInstructorsAttributeAsyncAction, studyplanlesson, {deferred: true})
    useEffect(() => {
        fetch(studyplanlesson)
    }, [studyplanlesson])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudyPlanLessonInstructorsAttribute studyplanlesson={entity} filter={filter} />    
}