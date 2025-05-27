import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a StudygroupGQLModel item into a studyplanlesson’s studygroups array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `studygroups` array.
 * @param {Object} studygroupItem - The item to insert; must have `__typename === "StudygroupGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonStudygroupItemInsert = (studyplanlesson, studygroupItem, dispatch) => {
    const { __typename } = studygroupItem;
    if (__typename === "StudygroupGQLModel") {
        const { studygroups, ...others } = studyplanlesson;
        const newStudyPlanLessonStudygroupItems = [...studygroups, studygroupItem];
        const newStudyPlanLesson = { ...others, studygroups: newStudyPlanLessonStudygroupItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Replaces an existing StudygroupGQLModel item in a studyplanlesson’s studygroups array and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `studygroups` array.
 * @param {Object} studygroupItem - The updated item; must have `__typename === "StudygroupGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonStudygroupItemUpdate = (studyplanlesson, studygroupItem, dispatch) => {
    const { __typename } = studygroupItem;
    if (__typename === "StudygroupGQLModel") {
        const { studygroups, ...others } = studyplanlesson;
        const newStudyPlanLessonStudygroupItems = studygroups.map(item =>
            item.id === studygroupItem.id ? studygroupItem : item
        );
        const newStudyPlanLesson = { ...others, studygroups: newStudyPlanLessonStudygroupItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

/**
 * Removes a StudygroupGQLModel item from a studyplanlesson’s studygroups array by its `id` and dispatches an update.
 *
 * @param {Object} studyplanlesson - The current studyplanlesson object containing a `studygroups` array.
 * @param {Object} studygroupItem - The item to delete; must have `__typename === "StudygroupGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudyPlanLessonStudygroupItemDelete = (studyplanlesson, studygroupItem, dispatch) => {
    const { __typename } = studygroupItem;
    if (__typename === "StudygroupGQLModel") {
        const { studygroups, ...others } = studyplanlesson;
        const newStudyPlanLessonStudygroupItems = studygroups.filter(
            item => item.id !== studygroupItem.id
        );
        const newStudyPlanLesson = { ...others, studygroups: newStudyPlanLessonStudygroupItems };
        dispatch(ItemActions.item_update(newStudyPlanLesson));
    }
};

const StudyPlanLessonStudygroupsAttributeQuery = `
query StudyPlanLessonQueryRead($id: UUID!, $where: StudygroupInputFilter, $skip: Int, $limit: Int) {
    result: studyplanlessonById(id: $id) {
        __typename
        id
        studygroups(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            startdate
            enddate
            grouptypeId
            mastergroupId
        }
    }
}
`

const StudyPlanLessonStudygroupsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyPlanLessonStudygroupsAttributeQuery,
    processVectorAttributeFromGraphQLResult("studygroups")
)

/**
 * A component for displaying the `studygroups` attribute of a studyplanlesson entity.
 *
 * This component checks if the `studygroups` attribute exists on the `studyplanlesson` object. If `studygroups` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `studygroups` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonStudygroupsAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {Array<Object>} [props.studyplanlesson.studygroups] - An array of studygroup items associated with the studyplanlesson entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the studygroups array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `studygroups` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const studyplanlessonEntity = { 
 *   studygroups: [
 *     { id: 1, name: "Studygroup Item 1" }, 
 *     { id: 2, name: "Studygroup Item 2" }
 *   ] 
 * };
 * <StudyPlanLessonStudygroupsAttribute studyplanlesson={studyplanlessonEntity} />
 *
 * @example
 * // With a custom filter:
 * <StudyPlanLessonStudygroupsAttribute 
 *   studyplanlesson={studyplanlessonEntity}
 *   filter={studygroup => studygroup.name.includes("1")}
 * />
 */
export const StudyPlanLessonStudygroupsAttribute = ({studyplanlesson, filter=Boolean}) => {
    const { studygroups: unfiltered } = studyplanlesson
    if (typeof unfiltered === 'undefined') return null
    const studygroups = unfiltered.filter(filter)
    if (studygroups.length === 0) return null
    return (
        <>
            {studygroups.map(
                studygroup => <div id={studygroup.id} key={studygroup.id}>
                    {/* <StudygroupMediumCard studygroup={studygroup} /> */}
                    {/* <StudygroupLink studygroup={studygroup} /> */}
                    Probably {'<StudygroupMediumCard studygroup={studygroup} />'} <br />
                    <pre>{JSON.stringify(studygroup, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of studygroup items using `StudyPlanLessonStudygroupsAttribute`.
 *
 * Wraps the `StudyPlanLessonStudygroupsAttribute` component, passing the given `items` as the `studygroups` attribute
 * on a synthetic `studyplanlesson` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of studygroup items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `StudyPlanLessonStudygroupsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of studygroups or `null` if none are provided.
 *
 * @example
 * <StudygroupsVisualiser
 *   items={[
 *     { id: 1, name: "Studygroup 1" },
 *     { id: 2, name: "Studygroup 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const StudygroupsVisualiser = ({ items, ...props }) => 
    <StudyPlanLessonStudygroupsAttribute {...props} studyplanlesson={{ studygroups: items }} />

/**
 * Infinite-scrolling component for the `studygroups` attribute of a studyplanlesson entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `studygroups` array
 * associated with the provided `studyplanlesson` object. It utilizes `StudygroupsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity containing the `studygroups` array.
 * @param {Array<Object>} [props.studyplanlesson.studygroups] - (Optional) Preloaded studygroup items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `StudygroupsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of studygroups.
 *
 * @example
 * <StudyPlanLessonStudygroupsAttributeInfinite
 *   studyplanlesson={{
 *     studygroups: [
 *       { id: 1, name: "Studygroup 1" },
 *       { id: 2, name: "Studygroup 2" }
 *     ]
 *   }}
 * />
 */
export const StudyPlanLessonStudygroupsAttributeInfinite = ({studyplanlesson, actionParams={}, ...props}) => { 
    const {studygroups} = studyplanlesson

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={StudygroupsVisualiser} 
            preloadedItems={studygroups}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={StudyPlanLessonStudygroupsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `studygroups` from a `studyplanlesson` entity.
 *
 * This component uses the `StudyPlanLessonStudygroupsAttributeAsyncAction` to asynchronously fetch
 * the `studyplanlesson.studygroups` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each studygroup item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.studyplanlesson - The studyplanlesson entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `studygroups` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered studygroups or a loading/error placeholder.
 *
 * @example
 * <StudyPlanLessonStudygroupsAttributeLazy studyplanlesson={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudyPlanLessonStudygroupsAttributeLazy
 *   studyplanlesson={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudyPlanLessonStudygroupsAttributeLazy = ({studyplanlesson, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudyPlanLessonStudygroupsAttributeAsyncAction, studyplanlesson, {deferred: true})
    useEffect(() => {
        fetch(studyplanlesson)
    }, [studyplanlesson])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudyPlanLessonStudygroupsAttribute studyplanlesson={entity} filter={filter} />    
}