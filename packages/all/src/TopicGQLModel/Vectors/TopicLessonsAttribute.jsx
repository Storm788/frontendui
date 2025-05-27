import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a LessonGQLModel item into a topic’s lessons array and dispatches an update.
 *
 * @param {Object} topic - The current topic object containing a `lessons` array.
 * @param {Object} lessonItem - The item to insert; must have `__typename === "LessonGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpTopicLessonItemInsert = (topic, lessonItem, dispatch) => {
    const { __typename } = lessonItem;
    if (__typename === "LessonGQLModel") {
        const { lessons, ...others } = topic;
        const newTopicLessonItems = [...lessons, lessonItem];
        const newTopic = { ...others, lessons: newTopicLessonItems };
        dispatch(ItemActions.item_update(newTopic));
    }
};

/**
 * Replaces an existing LessonGQLModel item in a topic’s lessons array and dispatches an update.
 *
 * @param {Object} topic - The current topic object containing a `lessons` array.
 * @param {Object} lessonItem - The updated item; must have `__typename === "LessonGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpTopicLessonItemUpdate = (topic, lessonItem, dispatch) => {
    const { __typename } = lessonItem;
    if (__typename === "LessonGQLModel") {
        const { lessons, ...others } = topic;
        const newTopicLessonItems = lessons.map(item =>
            item.id === lessonItem.id ? lessonItem : item
        );
        const newTopic = { ...others, lessons: newTopicLessonItems };
        dispatch(ItemActions.item_update(newTopic));
    }
};

/**
 * Removes a LessonGQLModel item from a topic’s lessons array by its `id` and dispatches an update.
 *
 * @param {Object} topic - The current topic object containing a `lessons` array.
 * @param {Object} lessonItem - The item to delete; must have `__typename === "LessonGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpTopicLessonItemDelete = (topic, lessonItem, dispatch) => {
    const { __typename } = lessonItem;
    if (__typename === "LessonGQLModel") {
        const { lessons, ...others } = topic;
        const newTopicLessonItems = lessons.filter(
            item => item.id !== lessonItem.id
        );
        const newTopic = { ...others, lessons: newTopicLessonItems };
        dispatch(ItemActions.item_update(newTopic));
    }
};

const TopicLessonsAttributeQuery = `
query TopicQueryRead($id: UUID!, $where: LessonInputFilter, $skip: Int, $limit: Int) {
    result: topicById(id: $id) {
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
            topicId
            typeId
        }
    }
}
`

const TopicLessonsAttributeAsyncAction = createAsyncGraphQLAction(
    TopicLessonsAttributeQuery,
    processVectorAttributeFromGraphQLResult("lessons")
)

/**
 * A component for displaying the `lessons` attribute of a topic entity.
 *
 * This component checks if the `lessons` attribute exists on the `topic` object. If `lessons` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `lessons` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the TopicLessonsAttribute component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {Array<Object>} [props.topic.lessons] - An array of lesson items associated with the topic entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the lessons array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `lessons` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const topicEntity = { 
 *   lessons: [
 *     { id: 1, name: "Lesson Item 1" }, 
 *     { id: 2, name: "Lesson Item 2" }
 *   ] 
 * };
 * <TopicLessonsAttribute topic={topicEntity} />
 *
 * @example
 * // With a custom filter:
 * <TopicLessonsAttribute 
 *   topic={topicEntity}
 *   filter={lesson => lesson.name.includes("1")}
 * />
 */
export const TopicLessonsAttribute = ({topic, filter=Boolean}) => {
    const { lessons: unfiltered } = topic
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
 * Visualiser component for displaying a list of lesson items using `TopicLessonsAttribute`.
 *
 * Wraps the `TopicLessonsAttribute` component, passing the given `items` as the `lessons` attribute
 * on a synthetic `topic` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of lesson items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `TopicLessonsAttribute` (e.g., `filter`).
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
    <TopicLessonsAttribute {...props} topic={{ lessons: items }} />

/**
 * Infinite-scrolling component for the `lessons` attribute of a topic entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `lessons` array
 * associated with the provided `topic` object. It utilizes `LessonsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.topic - The topic entity containing the `lessons` array.
 * @param {Array<Object>} [props.topic.lessons] - (Optional) Preloaded lesson items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `LessonsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of lessons.
 *
 * @example
 * <TopicLessonsAttributeInfinite
 *   topic={{
 *     lessons: [
 *       { id: 1, name: "Lesson 1" },
 *       { id: 2, name: "Lesson 2" }
 *     ]
 *   }}
 * />
 */
export const TopicLessonsAttributeInfinite = ({topic, actionParams={}, ...props}) => { 
    const {lessons} = topic

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={LessonsVisualiser} 
            preloadedItems={lessons}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={TopicLessonsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `lessons` from a `topic` entity.
 *
 * This component uses the `TopicLessonsAttributeAsyncAction` to asynchronously fetch
 * the `topic.lessons` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each lesson item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.topic - The topic entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `lessons` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered lessons or a loading/error placeholder.
 *
 * @example
 * <TopicLessonsAttributeLazy topic={{ id: "abc123" }} />
 *
 * 
 * @example
 * <TopicLessonsAttributeLazy
 *   topic={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const TopicLessonsAttributeLazy = ({topic, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(TopicLessonsAttributeAsyncAction, topic, {deferred: true})
    useEffect(() => {
        fetch(topic)
    }, [topic])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <TopicLessonsAttribute topic={entity} filter={filter} />    
}