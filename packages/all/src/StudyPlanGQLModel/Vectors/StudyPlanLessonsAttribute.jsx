import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a LessonGQLModel item into a studyplan’s lessons array and dispatches an update.
 *
 * @param {Object} studyplan - The current studyplan object containing a `lessons` array.
 * @param {Object} lessonItem - The item to insert; must have `__typename === "LessonGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonItemInsert = (studyplan, lessonItem, dispatch) => {
    const { __typename } = lessonItem;
    if (__typename === "LessonGQLModel") {
        const { lessons, ...others } = studyplan;
        const newStudyPlanLessonItems = [...lessons, lessonItem];
        const newStudyPlan = { ...others, lessons: newStudyPlanLessonItems };
        dispatch(ItemActions.item_update(newStudyPlan));
    }
};

/**
 * Replaces an existing LessonGQLModel item in a studyplan’s lessons array and dispatches an update.
 *
 * @param {Object} studyplan - The current studyplan object containing a `lessons` array.
 * @param {Object} lessonItem - The updated item; must have `__typename === "LessonGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonItemUpdate = (studyplan, lessonItem, dispatch) => {
    const { __typename } = lessonItem;
    if (__typename === "LessonGQLModel") {
        const { lessons, ...others } = studyplan;
        const newStudyPlanLessonItems = lessons.map(item =>
            item.id === lessonItem.id ? lessonItem : item
        );
        const newStudyPlan = { ...others, lessons: newStudyPlanLessonItems };
        dispatch(ItemActions.item_update(newStudyPlan));
    }
};

/**
 * Removes a LessonGQLModel item from a studyplan’s lessons array by its `id` and dispatches an update.
 *
 * @param {Object} studyplan - The current studyplan object containing a `lessons` array.
 * @param {Object} lessonItem - The item to delete; must have `__typename === "LessonGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonItemDelete = (studyplan, lessonItem, dispatch) => {
    const { __typename } = lessonItem;
    if (__typename === "LessonGQLModel") {
        const { lessons, ...others } = studyplan;
        const newStudyPlanLessonItems = lessons.filter(
            item => item.id !== lessonItem.id
        );
        const newStudyPlan = { ...others, lessons: newStudyPlanLessonItems };
        dispatch(ItemActions.item_update(newStudyPlan));
    }
};

const StudyPlanLessonsAttributeQuery = `
query StudyPlanQueryRead($id: UUID!, $where: LessonInputFilter, $skip: Int, $limit: Int) {
    result: studyplanById(id: $id) {
        __typename
        id
        lessons(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            eventId
            topicId
            lessontypeId
            linkedWithId
            planId
        }
    }
}
`

const StudyPlanLessonsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyPlanLessonsAttributeQuery,
    processVectorAttributeFromGraphQLResult("lessons")
)

/**
 * A component for displaying the `lessons` attribute of a studyplan entity.
 *
 * This component checks if the `lessons` attribute exists on the `studyplan` object. If `lessons` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `lessons` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonsAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {Array<Object>} [props.studyplan.lessons] - An array of lesson items associated with the studyplan entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the lessons array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `lessons` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const studyplanEntity = { 
 *   lessons: [
 *     { id: 1, name: "Lesson Item 1" }, 
 *     { id: 2, name: "Lesson Item 2" }
 *   ] 
 * };
 * <StudyPlanLessonsAttribute studyplan={studyplanEntity} />
 *
 * @example
 * // With a custom filter:
 * <StudyPlanLessonsAttribute 
 *   studyplan={studyplanEntity}
 *   filter={lesson => lesson.name.includes("1")}
 * />
 */
export const StudyPlanLessonsAttribute = ({studyplan, filter=Boolean}) => {
    const { lessons: unfiltered } = studyplan
    if (typeof unfiltered === 'undefined') return null
    const lessons = unfiltered.filter(filter)
    if (lessons.length === 0) return null
    return (
        <>
            {lessons.map(
                lesson => <div id={lesson.id} key={lesson.id}>
                    {/* <LessonMediumCard lesson={lesson} /> */}
                    {/* <LessonLink lesson={lesson} /> */}
                    Probably {'<LessonMediumCard lesson={lesson} />'} <br />
                    <pre>{JSON.stringify(lesson, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of lesson items using `StudyPlanLessonsAttribute`.
 *
 * Wraps the `StudyPlanLessonsAttribute` component, passing the given `items` as the `lessons` attribute
 * on a synthetic `studyplan` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of lesson items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StudyPlanLessonsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of lessons or `null` if none are provided.
 *
 * @example
 * <LessonsVisualiser
 *   items={[
 *     { id: 1, name: "Lesson 1" },
 *     { id: 2, name: "Lesson 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const LessonsVisualiser = ({ items, ...props }) => 
    <StudyPlanLessonsAttribute {...props} studyplan={{ lessons: items }} />

/**
 * Infinite-scrolling component for the `lessons` attribute of a studyplan entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `lessons` array
 * associated with the provided `studyplan` object. It utilizes `LessonsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.studyplan - The studyplan entity containing the `lessons` array.
 * @param {Array<Object>} [props.studyplan.lessons] - (Optional) Preloaded lesson items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `LessonsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of lessons.
 *
 * @example
 * <StudyPlanLessonsAttributeInfinite
 *   studyplan={{
 *     lessons: [
 *       { id: 1, name: "Lesson 1" },
 *       { id: 2, name: "Lesson 2" }
 *     ]
 *   }}
 * />
 */
export const StudyPlanLessonsAttributeInfinite = ({studyplan, actionParams={}, ...props}) => { 
    const {lessons} = studyplan

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={LessonsVisualiser} 
            preloadedItems={lessons}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StudyPlanLessonsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `lessons` from a `studyplan` entity.
 *
 * This component uses the `StudyPlanLessonsAttributeAsyncAction` to asynchronously fetch
 * the `studyplan.lessons` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each lesson item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.studyplan - The studyplan entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `lessons` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered lessons or a loading/error placeholder.
 *
 * @example
 * <StudyPlanLessonsAttributeLazy studyplan={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudyPlanLessonsAttributeLazy
 *   studyplan={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudyPlanLessonsAttributeLazy = ({studyplan, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudyPlanLessonsAttributeAsyncAction, studyplan, {deferred: true})
    useEffect(() => {
        fetch(studyplan)
    }, [studyplan])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudyPlanLessonsAttribute studyplan={entity} filter={filter} />    
}