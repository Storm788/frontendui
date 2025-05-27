import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a MastergroupGQLModel item into a group’s mastergroups array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `mastergroups` array.
 * @param {Object} mastergroupItem - The item to insert; must have `__typename === "MastergroupGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupMastergroupItemInsert = (group, mastergroupItem, dispatch) => {
    const { __typename } = mastergroupItem;
    if (__typename === "MastergroupGQLModel") {
        const { mastergroups, ...others } = group;
        const newGroupMastergroupItems = [...mastergroups, mastergroupItem];
        const newGroup = { ...others, mastergroups: newGroupMastergroupItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Replaces an existing MastergroupGQLModel item in a group’s mastergroups array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `mastergroups` array.
 * @param {Object} mastergroupItem - The updated item; must have `__typename === "MastergroupGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupMastergroupItemUpdate = (group, mastergroupItem, dispatch) => {
    const { __typename } = mastergroupItem;
    if (__typename === "MastergroupGQLModel") {
        const { mastergroups, ...others } = group;
        const newGroupMastergroupItems = mastergroups.map(item =>
            item.id === mastergroupItem.id ? mastergroupItem : item
        );
        const newGroup = { ...others, mastergroups: newGroupMastergroupItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Removes a MastergroupGQLModel item from a group’s mastergroups array by its `id` and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `mastergroups` array.
 * @param {Object} mastergroupItem - The item to delete; must have `__typename === "MastergroupGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupMastergroupItemDelete = (group, mastergroupItem, dispatch) => {
    const { __typename } = mastergroupItem;
    if (__typename === "MastergroupGQLModel") {
        const { mastergroups, ...others } = group;
        const newGroupMastergroupItems = mastergroups.filter(
            item => item.id !== mastergroupItem.id
        );
        const newGroup = { ...others, mastergroups: newGroupMastergroupItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

const GroupMastergroupsAttributeQuery = `
query GroupQueryRead($id: UUID!, $where: MastergroupInputFilter, $skip: Int, $limit: Int) {
    result: groupById(id: $id) {
        __typename
        id
        mastergroups(skip: $skip, limit: $limit, where: $where) {
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

const GroupMastergroupsAttributeAsyncAction = createAsyncGraphQLAction(
    GroupMastergroupsAttributeQuery,
    processVectorAttributeFromGraphQLResult("mastergroups")
)

/**
 * A component for displaying the `mastergroups` attribute of a group entity.
 *
 * This component checks if the `mastergroups` attribute exists on the `group` object. If `mastergroups` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `mastergroups` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the GroupMastergroupsAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {Array<Object>} [props.group.mastergroups] - An array of mastergroup items associated with the group entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the mastergroups array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `mastergroups` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const groupEntity = { 
 *   mastergroups: [
 *     { id: 1, name: "Mastergroup Item 1" }, 
 *     { id: 2, name: "Mastergroup Item 2" }
 *   ] 
 * };
 * <GroupMastergroupsAttribute group={groupEntity} />
 *
 * @example
 * // With a custom filter:
 * <GroupMastergroupsAttribute 
 *   group={groupEntity}
 *   filter={mastergroup => mastergroup.name.includes("1")}
 * />
 */
export const GroupMastergroupsAttribute = ({group, filter=Boolean}) => {
    const { mastergroups: unfiltered } = group
    if (typeof unfiltered === 'undefined') return null
    const mastergroups = unfiltered.filter(filter)
    if (mastergroups.length === 0) return null
    return (
        <>
            {mastergroups.map(
                mastergroup => <div id={mastergroup.id} key={mastergroup.id}>
                    {/* <MastergroupMediumCard mastergroup={mastergroup} /> */}
                    {/* <MastergroupLink mastergroup={mastergroup} /> */}
                    Probably {'<MastergroupMediumCard mastergroup={mastergroup} />'} <br />
                    <pre>{JSON.stringify(mastergroup, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of mastergroup items using `GroupMastergroupsAttribute`.
 *
 * Wraps the `GroupMastergroupsAttribute` component, passing the given `items` as the `mastergroups` attribute
 * on a synthetic `group` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of mastergroup items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `GroupMastergroupsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of mastergroups or `null` if none are provided.
 *
 * @example
 * <MastergroupsVisualiser
 *   items={[
 *     { id: 1, name: "Mastergroup 1" },
 *     { id: 2, name: "Mastergroup 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const MastergroupsVisualiser = ({ items, ...props }) => 
    <GroupMastergroupsAttribute {...props} group={{ mastergroups: items }} />

/**
 * Infinite-scrolling component for the `mastergroups` attribute of a group entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `mastergroups` array
 * associated with the provided `group` object. It utilizes `MastergroupsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.group - The group entity containing the `mastergroups` array.
 * @param {Array<Object>} [props.group.mastergroups] - (Optional) Preloaded mastergroup items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `MastergroupsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of mastergroups.
 *
 * @example
 * <GroupMastergroupsAttributeInfinite
 *   group={{
 *     mastergroups: [
 *       { id: 1, name: "Mastergroup 1" },
 *       { id: 2, name: "Mastergroup 2" }
 *     ]
 *   }}
 * />
 */
export const GroupMastergroupsAttributeInfinite = ({group, actionParams={}, ...props}) => { 
    const {mastergroups} = group

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={MastergroupsVisualiser} 
            preloadedItems={mastergroups}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={GroupMastergroupsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `mastergroups` from a `group` entity.
 *
 * This component uses the `GroupMastergroupsAttributeAsyncAction` to asynchronously fetch
 * the `group.mastergroups` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each mastergroup item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.group - The group entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `mastergroups` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered mastergroups or a loading/error placeholder.
 *
 * @example
 * <GroupMastergroupsAttributeLazy group={{ id: "abc123" }} />
 *
 * 
 * @example
 * <GroupMastergroupsAttributeLazy
 *   group={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const GroupMastergroupsAttributeLazy = ({group, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(GroupMastergroupsAttributeAsyncAction, group, {deferred: true})
    useEffect(() => {
        fetch(group)
    }, [group])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <GroupMastergroupsAttribute group={entity} filter={filter} />    
}