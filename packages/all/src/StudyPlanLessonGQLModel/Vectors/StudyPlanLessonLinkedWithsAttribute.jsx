import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a LinkedwithGQLModel item into a studyplanlesson’s linkedwiths array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `linkedwiths` array.
 * @param {Object} linkedwithItem - The item to insert; must have `__typename === "LinkedwithGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonLinkedwithItemInsert = (studyplanlesson, linkedwithItem, dispatch) => {
    const { __typename } = linkedwithItem;
    if (__typename === "LinkedwithGQLModel") {
        const { linkedwiths, ...others } = studyplanlesson;
        const newStudyPlanLessonLinkedwithItems = [...linkedwiths, linkedwithItem];
        const newStudyPlanLesson = { ...others, linkedwiths: newStudyPlanLessonLinkedwithItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Replaces an existing LinkedwithGQLModel item in a studyplanlesson’s linkedwiths array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `linkedwiths` array.
 * @param {Object} linkedwithItem - The updated item; must have `__typename === "LinkedwithGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonLinkedwithItemUpdate = (studyplanlesson, linkedwithItem, dispatch) => {
    const { __typename } = linkedwithItem;
    if (__typename === "LinkedwithGQLModel") {
        const { linkedwiths, ...others } = studyplanlesson;
        const newStudyPlanLessonLinkedwithItems = linkedwiths.map(item =>
            item.id === linkedwithItem.id ? linkedwithItem : item
        );
        const newStudyPlanLesson = { ...others, linkedwiths: newStudyPlanLessonLinkedwithItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Removes a LinkedwithGQLModel item from a studyplanlesson’s linkedwiths array by its `id` and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `linkedwiths` array.
 * @param {Object} linkedwithItem - The item to delete; must have `__typename === "LinkedwithGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonLinkedwithItemDelete = (studyplanlesson, linkedwithItem, dispatch) => {
    const { __typename } = linkedwithItem;
    if (__typename === "LinkedwithGQLModel") {
        const { linkedwiths, ...others } = studyplanlesson;
        const newStudyPlanLessonLinkedwithItems = linkedwiths.filter(
            item => item.id !== linkedwithItem.id
        );
        const newStudyPlanLesson = { ...others, linkedwiths: newStudyPlanLessonLinkedwithItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

const StudyPlanLessonLinkedwithsAttributeQuery = `
query StudyPlanLessonQueryRead($id: UUID!, $where: LinkedwithInputFilter, $skip: Int, $limit: Int) {
    result: studyplanlessonById(id: $id) {
        __typename
        id
        linkedwiths(skip: $skip, limit: $limit, where: $where) {
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

const StudyPlanLessonLinkedwithsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyPlanLessonLinkedwithsAttributeQuery,
    processVectorAttributeFromGraphQLResult("linkedwiths")
)

/**
 * A component for displaying the `linkedwiths` attribute of a studyplanlesson entity.
 *
 * This component checks if the `linkedwiths` attribute exists on the `studyplanlesson` object. If `linkedwiths` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `linkedwiths` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonLinkedwithsAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {Array<Object>} [props.studyplanlesson.linkedwiths] - An array of linkedwith items associated with the studyplanlesson entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the linkedwiths array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `linkedwiths` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const studyplanlessonEntity = { 
 *   linkedwiths: [
 *     { id: 1, name: "Linkedwith Item 1" }, 
 *     { id: 2, name: "Linkedwith Item 2" }
 *   ] 
 * };
 * <StudyPlanLessonLinkedwithsAttribute studyplanlesson={studyplanlessonEntity} />
 *
 * @example
 * // With a custom filter:
 * <StudyPlanLessonLinkedwithsAttribute 
 *   studyplanlesson={studyplanlessonEntity}
 *   filter={linkedwith => linkedwith.name.includes("1")}
 * />
 */
export const StudyPlanLessonLinkedwithsAttribute = ({studyplanlesson, filter=Boolean}) => {
    const { linkedwiths: unfiltered } = studyplanlesson
    if (typeof unfiltered === 'undefined') return null
    const linkedwiths = unfiltered.filter(filter)
    if (linkedwiths.length === 0) return null
    return (
        <>
            {linkedwiths.map(
                linkedwith => <div id={linkedwith.id} key={linkedwith.id}>
                    {/* <LinkedwithMediumCard linkedwith={linkedwith} /> */}
                    {/* <LinkedwithLink linkedwith={linkedwith} /> */}
                    Probably {'<LinkedwithMediumCard linkedwith={linkedwith} />'} <br />
                    <pre>{JSON.stringify(linkedwith, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of linkedwith items using `StudyPlanLessonLinkedwithsAttribute`.
 *
 * Wraps the `StudyPlanLessonLinkedwithsAttribute` component, passing the given `items` as the `linkedwiths` attribute
 * on a synthetic `studyplanlesson` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of linkedwith items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StudyPlanLessonLinkedwithsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of linkedwiths or `null` if none are provided.
 *
 * @example
 * <LinkedwithsVisualiser
 *   items={[
 *     { id: 1, name: "Linkedwith 1" },
 *     { id: 2, name: "Linkedwith 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const LinkedwithsVisualiser = ({ items, ...props }) => 
    <StudyPlanLessonLinkedwithsAttribute {...props} studyplanlesson={{ linkedwiths: items }} />

/**
 * Infinite-scrolling component for the `linkedwiths` attribute of a studyplanlesson entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `linkedwiths` array
 * associated with the provided `studyplanlesson` object. It utilizes `LinkedwithsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity containing the `linkedwiths` array.
 * @param {Array<Object>} [props.studyplanlesson.linkedwiths] - (Optional) Preloaded linkedwith items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `LinkedwithsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of linkedwiths.
 *
 * @example
 * <StudyPlanLessonLinkedwithsAttributeInfinite
 *   studyplanlesson={{
 *     linkedwiths: [
 *       { id: 1, name: "Linkedwith 1" },
 *       { id: 2, name: "Linkedwith 2" }
 *     ]
 *   }}
 * />
 */
export const StudyPlanLessonLinkedwithsAttributeInfinite = ({studyplanlesson, actionParams={}, ...props}) => { 
    const {linkedwiths} = studyplanlesson

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={LinkedwithsVisualiser} 
            preloadedItems={linkedwiths}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StudyPlanLessonLinkedwithsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `linkedwiths` from a `studyplanlesson` entity.
 *
 * This component uses the `StudyPlanLessonLinkedwithsAttributeAsyncAction` to asynchronously fetch
 * the `studyplanlesson.linkedwiths` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each linkedwith item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `linkedwiths` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered linkedwiths or a loading/error placeholder.
 *
 * @example
 * <StudyPlanLessonLinkedwithsAttributeLazy studyplanlesson={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudyPlanLessonLinkedwithsAttributeLazy
 *   studyplanlesson={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudyPlanLessonLinkedwithsAttributeLazy = ({studyplanlesson, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudyPlanLessonLinkedwithsAttributeAsyncAction, studyplanlesson, {deferred: true})
    useEffect(() => {
        fetch(studyplanlesson)
    }, [studyplanlesson])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudyPlanLessonLinkedwithsAttribute studyplanlesson={entity} filter={filter} />    
}