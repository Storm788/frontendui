import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a PrerequisiteGQLModel item into a semester’s prerequisites array and dispatches an update.
 *
 * @param {Object} semester - The current semester object containing a `prerequisites` array.
 * @param {Object} prerequisiteItem - The item to insert; must have `__typename === "PrerequisiteGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSemesterPrerequisiteItemInsert = (semester, prerequisiteItem, dispatch) => {
    const { __typename } = prerequisiteItem;
    if (__typename === "PrerequisiteGQLModel") {
        const { prerequisites, ...others } = semester;
        const newSemesterPrerequisiteItems = [...prerequisites, prerequisiteItem];
        const newSemester = { ...others, prerequisites: newSemesterPrerequisiteItems };
        dispatch(ItemActions.item_update(newSemester));
    }
};

/**
 * Replaces an existing PrerequisiteGQLModel item in a semester’s prerequisites array and dispatches an update.
 *
 * @param {Object} semester - The current semester object containing a `prerequisites` array.
 * @param {Object} prerequisiteItem - The updated item; must have `__typename === "PrerequisiteGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSemesterPrerequisiteItemUpdate = (semester, prerequisiteItem, dispatch) => {
    const { __typename } = prerequisiteItem;
    if (__typename === "PrerequisiteGQLModel") {
        const { prerequisites, ...others } = semester;
        const newSemesterPrerequisiteItems = prerequisites.map(item =>
            item.id === prerequisiteItem.id ? prerequisiteItem : item
        );
        const newSemester = { ...others, prerequisites: newSemesterPrerequisiteItems };
        dispatch(ItemActions.item_update(newSemester));
    }
};

/**
 * Removes a PrerequisiteGQLModel item from a semester’s prerequisites array by its `id` and dispatches an update.
 *
 * @param {Object} semester - The current semester object containing a `prerequisites` array.
 * @param {Object} prerequisiteItem - The item to delete; must have `__typename === "PrerequisiteGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSemesterPrerequisiteItemDelete = (semester, prerequisiteItem, dispatch) => {
    const { __typename } = prerequisiteItem;
    if (__typename === "PrerequisiteGQLModel") {
        const { prerequisites, ...others } = semester;
        const newSemesterPrerequisiteItems = prerequisites.filter(
            item => item.id !== prerequisiteItem.id
        );
        const newSemester = { ...others, prerequisites: newSemesterPrerequisiteItems };
        dispatch(ItemActions.item_update(newSemester));
    }
};

const SemesterPrerequisitesAttributeQuery = `
query SemesterQueryRead($id: UUID!, $where: PrerequisiteInputFilter, $skip: Int, $limit: Int) {
    result: semesterById(id: $id) {
        __typename
        id
        prerequisites(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            programId
            groupId
        }
    }
}
`

const SemesterPrerequisitesAttributeAsyncAction = createAsyncGraphQLAction(
    SemesterPrerequisitesAttributeQuery,
    processVectorAttributeFromGraphQLResult("prerequisites")
)

/**
 * A component for displaying the `prerequisites` attribute of a semester entity.
 *
 * This component checks if the `prerequisites` attribute exists on the `semester` object. If `prerequisites` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `prerequisites` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the SemesterPrerequisitesAttribute component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {Array<Object>} [props.semester.prerequisites] - An array of prerequisite items associated with the semester entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the prerequisites array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `prerequisites` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const semesterEntity = { 
 *   prerequisites: [
 *     { id: 1, name: "Prerequisite Item 1" }, 
 *     { id: 2, name: "Prerequisite Item 2" }
 *   ] 
 * };
 * <SemesterPrerequisitesAttribute semester={semesterEntity} />
 *
 * @example
 * // With a custom filter:
 * <SemesterPrerequisitesAttribute 
 *   semester={semesterEntity}
 *   filter={prerequisite => prerequisite.name.includes("1")}
 * />
 */
export const SemesterPrerequisitesAttribute = ({semester, filter=Boolean}) => {
    const { prerequisites: unfiltered } = semester
    if (typeof unfiltered === 'undefined') return null
    const prerequisites = unfiltered.filter(filter)
    if (prerequisites.length === 0) return null
    return (
        <>
            {prerequisites.map(
                prerequisite => <div id={prerequisite.id} key={prerequisite.id}>
                    {/* <PrerequisiteMediumCard prerequisite={prerequisite} /> */}
                    {/* <PrerequisiteLink prerequisite={prerequisite} /> */}
                    Probably {'<PrerequisiteMediumCard prerequisite={prerequisite} />'} <br />
                    <pre>{JSON.stringify(prerequisite, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of prerequisite items using `SemesterPrerequisitesAttribute`.
 *
 * Wraps the `SemesterPrerequisitesAttribute` component, passing the given `items` as the `prerequisites` attribute
 * on a synthetic `semester` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of prerequisite items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `SemesterPrerequisitesAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of prerequisites or `null` if none are provided.
 *
 * @example
 * <PrerequisitesVisualiser
 *   items={[
 *     { id: 1, name: "Prerequisite 1" },
 *     { id: 2, name: "Prerequisite 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const PrerequisitesVisualiser = ({ items, ...props }) => 
    <SemesterPrerequisitesAttribute {...props} semester={{ prerequisites: items }} />

/**
 * Infinite-scrolling component for the `prerequisites` attribute of a semester entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `prerequisites` array
 * associated with the provided `semester` object. It utilizes `PrerequisitesVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.semester - The semester entity containing the `prerequisites` array.
 * @param {Array<Object>} [props.semester.prerequisites] - (Optional) Preloaded prerequisite items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `PrerequisitesVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of prerequisites.
 *
 * @example
 * <SemesterPrerequisitesAttributeInfinite
 *   semester={{
 *     prerequisites: [
 *       { id: 1, name: "Prerequisite 1" },
 *       { id: 2, name: "Prerequisite 2" }
 *     ]
 *   }}
 * />
 */
export const SemesterPrerequisitesAttributeInfinite = ({semester, actionParams={}, ...props}) => { 
    const {prerequisites} = semester

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={PrerequisitesVisualiser} 
            preloadedItems={prerequisites}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={SemesterPrerequisitesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `prerequisites` from a `semester` entity.
 *
 * This component uses the `SemesterPrerequisitesAttributeAsyncAction` to asynchronously fetch
 * the `semester.prerequisites` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each prerequisite item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.semester - The semester entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `prerequisites` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered prerequisites or a loading/error placeholder.
 *
 * @example
 * <SemesterPrerequisitesAttributeLazy semester={{ id: "abc123" }} />
 *
 * 
 * @example
 * <SemesterPrerequisitesAttributeLazy
 *   semester={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const SemesterPrerequisitesAttributeLazy = ({semester, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(SemesterPrerequisitesAttributeAsyncAction, semester, {deferred: true})
    useEffect(() => {
        fetch(semester)
    }, [semester])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <SemesterPrerequisitesAttribute semester={entity} filter={filter} />    
}