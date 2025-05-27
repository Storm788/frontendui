import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";
import { TopicMediumCard } from "../../TopicGQLModel"
import { Col, Row } from "react-bootstrap";

/**
 * Inserts a TopicGQLModel item into a semester’s topics array and dispatches an update.
 *
 * @param {Object} semester - The current semester object containing a `topics` array.
 * @param {Object} topicItem - The item to insert; must have `__typename === "TopicGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSemesterTopicItemInsert = (semester, topicItem, dispatch) => {
    const { __typename } = topicItem;
    if (__typename === "TopicGQLModel") {
        const { topics, ...others } = semester;
        const newSemesterTopicItems = [...topics, topicItem];
        const newSemester = { ...others, topics: newSemesterTopicItems };
        dispatch(ItemActions.item_update(newSemester));
    }
};

/**
 * Replaces an existing TopicGQLModel item in a semester’s topics array and dispatches an update.
 *
 * @param {Object} semester - The current semester object containing a `topics` array.
 * @param {Object} topicItem - The updated item; must have `__typename === "TopicGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSemesterTopicItemUpdate = (semester, topicItem, dispatch) => {
    const { __typename } = topicItem;
    if (__typename === "TopicGQLModel") {
        const { topics, ...others } = semester;
        const newSemesterTopicItems = topics.map(item =>
            item.id === topicItem.id ? topicItem : item
        );
        const newSemester = { ...others, topics: newSemesterTopicItems };
        dispatch(ItemActions.item_update(newSemester));
    }
};

/**
 * Removes a TopicGQLModel item from a semester’s topics array by its `id` and dispatches an update.
 *
 * @param {Object} semester - The current semester object containing a `topics` array.
 * @param {Object} topicItem - The item to delete; must have `__typename === "TopicGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSemesterTopicItemDelete = (semester, topicItem, dispatch) => {
    const { __typename } = topicItem;
    if (__typename === "TopicGQLModel") {
        const { topics, ...others } = semester;
        const newSemesterTopicItems = topics.filter(
            item => item.id !== topicItem.id
        );
        const newSemester = { ...others, topics: newSemesterTopicItems };
        dispatch(ItemActions.item_update(newSemester));
    }
};

const SemesterTopicsAttributeQuery = `
query SemesterQueryRead($id: UUID!, $where: TopicInputFilter, $skip: Int, $limit: Int) {
    result: semesterById(id: $id) {
        __typename
        id
        topics(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            name
            description
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            semesterId
        }
    }
}
`

const SemesterTopicsAttributeAsyncAction = createAsyncGraphQLAction(
    SemesterTopicsAttributeQuery,
    processVectorAttributeFromGraphQLResult("topics")
)

/**
 * A component for displaying the `topics` attribute of a semester entity.
 *
 * This component checks if the `topics` attribute exists on the `semester` object. If `topics` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `topics` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the SemesterTopicsAttribute component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {Array<Object>} [props.semester.topics] - An array of topic items associated with the semester entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the topics array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `topics` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const semesterEntity = { 
 *   topics: [
 *     { id: 1, name: "Topic Item 1" }, 
 *     { id: 2, name: "Topic Item 2" }
 *   ] 
 * };
 * <SemesterTopicsAttribute semester={semesterEntity} />
 *
 * @example
 * // With a custom filter:
 * <SemesterTopicsAttribute 
 *   semester={semesterEntity}
 *   filter={topic => topic.name.includes("1")}
 * />
 */
export const SemesterTopicsAttribute = ({semester, filter=Boolean}) => {
    const { topics: unfiltered } = semester
    if (typeof unfiltered === 'undefined') return null
    const topics = unfiltered.filter(filter)
    if (topics.length === 0) return null
    return (
        <>
            {topics.map(
                topic => <Col id={topic.id} key={topic.id}>
                    <TopicMediumCard topic={topic} />
                    {/* <TopicLink topic={topic} /> */}
                    {/* Probably {'<TopicMediumCard topic={topic} />'} <br /> */}
                    {/* <pre>{JSON.stringify(topic, null, 4)}</pre> */}
                </Col>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of topic items using `SemesterTopicsAttribute`.
 *
 * Wraps the `SemesterTopicsAttribute` component, passing the given `items` as the `topics` attribute
 * on a synthetic `semester` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of topic items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `SemesterTopicsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of topics or `null` if none are provided.
 *
 * @example
 * <TopicsVisualiser
 *   items={[
 *     { id: 1, name: "Topic 1" },
 *     { id: 2, name: "Topic 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const TopicsVisualiser = ({ items, ...props }) => 
    <Row>
        <SemesterTopicsAttribute {...props} semester={{ topics: items }} />
    </Row>

/**
 * Infinite-scrolling component for the `topics` attribute of a semester entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `topics` array
 * associated with the provided `semester` object. It utilizes `TopicsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.semester - The semester entity containing the `topics` array.
 * @param {Array<Object>} [props.semester.topics] - (Optional) Preloaded topic items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `TopicsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of topics.
 *
 * @example
 * <SemesterTopicsAttributeInfinite
 *   semester={{
 *     topics: [
 *       { id: 1, name: "Topic 1" },
 *       { id: 2, name: "Topic 2" }
 *     ]
 *   }}
 * />
 */
export const SemesterTopicsAttributeInfinite = ({semester, actionParams={}, ...props}) => { 
    const {topics} = semester

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={TopicsVisualiser} 
            preloadedItems={topics}
            actionParams={{...semester, ...actionParams, skip: 0, limit: 10}}
            asyncAction={SemesterTopicsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `topics` from a `semester` entity.
 *
 * This component uses the `SemesterTopicsAttributeAsyncAction` to asynchronously fetch
 * the `semester.topics` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each topic item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.semester - The semester entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `topics` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered topics or a loading/error placeholder.
 *
 * @example
 * <SemesterTopicsAttributeLazy semester={{ id: "abc123" }} />
 *
 * 
 * @example
 * <SemesterTopicsAttributeLazy
 *   semester={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const SemesterTopicsAttributeLazy = ({semester, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(SemesterTopicsAttributeAsyncAction, semester, {deferred: true})
    useEffect(() => {
        fetch(semester)
    }, [semester])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <SemesterTopicsAttribute semester={entity} filter={filter} />    
}