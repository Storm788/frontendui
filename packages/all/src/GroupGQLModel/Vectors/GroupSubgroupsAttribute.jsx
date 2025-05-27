import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { GroupLink } from "../Components";


/**
 * Inserts a SubgroupGQLModel item into a group’s subgroups array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `subgroups` array.
 * @param {Object} subgroupItem - The item to insert; must have `__typename === "SubgroupGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupSubgroupItemInsert = (group, subgroupItem, dispatch) => {
    const { __typename } = subgroupItem;
    if (__typename === "SubgroupGQLModel") {
        const { subgroups, ...others } = group;
        const newGroupSubgroupItems = [...subgroups, subgroupItem];
        const newGroup = { ...others, subgroups: newGroupSubgroupItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Replaces an existing SubgroupGQLModel item in a group’s subgroups array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `subgroups` array.
 * @param {Object} subgroupItem - The updated item; must have `__typename === "SubgroupGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupSubgroupItemUpdate = (group, subgroupItem, dispatch) => {
    const { __typename } = subgroupItem;
    if (__typename === "SubgroupGQLModel") {
        const { subgroups, ...others } = group;
        const newGroupSubgroupItems = subgroups.map(item =>
            item.id === subgroupItem.id ? subgroupItem : item
        );
        const newGroup = { ...others, subgroups: newGroupSubgroupItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Removes a SubgroupGQLModel item from a group’s subgroups array by its `id` and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `subgroups` array.
 * @param {Object} subgroupItem - The item to delete; must have `__typename === "SubgroupGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupSubgroupItemDelete = (group, subgroupItem, dispatch) => {
    const { __typename } = subgroupItem;
    if (__typename === "SubgroupGQLModel") {
        const { subgroups, ...others } = group;
        const newGroupSubgroupItems = subgroups.filter(
            item => item.id !== subgroupItem.id
        );
        const newGroup = { ...others, subgroups: newGroupSubgroupItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};


/**
 * A component for displaying the `subgroups` attribute of an group entity.
 *
 * This component checks if the `subgroups` attribute exists on the `group` object. If `subgroups` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `subgroups` array and
 * displays a placeholder message and a JSON representation for each item in the `subgroups`.
 *
 * @component
 * @param {Object} props - The props for the GroupSubgroupsAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {Array} [props.group.subgroups] - An array of subgroups items associated with the group entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `subgroups` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { 
 *   subgroups: [
 *     { id: 1, name: "Subgroup Item 1" }, 
 *     { id: 2, name: "Subgroup Item 2" }
 *   ] 
 * };
 *
 * <GroupSubgroupsAttribute group={groupEntity} />
 */
export const GroupSubgroupsAttribute = ({group}) => {
    const { subgroups } = group
    if (typeof subgroups === 'undefined') return null
    return (
        <>
            {subgroups.map(
                subgroup => <div id={subgroup.id} key={subgroup.id}>
                    <GroupLink group={subgroup} />
                    {/* Probably {'<SubgroupMediumCard subgroup=\{subgroup\} />'} <br />
                    <pre>{JSON.stringify(subgroup, null, 4)}</pre> */}
                </div>
            )}
        </>
    )
}

const GroupSubgroupsAttributeQuery = `
query GroupQueryRead($id: UUID!, $where: SubgroupInputFilter, $skip: Int, $limit: Int) {
    result: groupById(id: $id) {
        __typename
        id
        subgroups(skip: $skip, limit: $limit, where: $where) {
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

const GroupSubgroupsAttributeAsyncAction = createAsyncGraphQLAction(
    GroupSubgroupsAttributeQuery,
    processVectorAttributeFromGraphQLResult("subgroups")
)

export const GroupSubgroupsAttributeInfinite = ({group}) => { 
    const {subgroups} = group

    return (
        <InfiniteScroll 
            Visualiser={'SubgroupMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={GroupSubgroupsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `subgroups` from a `group` entity.
 *
 * This component uses the `GroupSubgroupsAttributeAsyncAction` to asynchronously fetch
 * the `group.subgroups` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each subgroup item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.group - The group entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `subgroups` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered subgroups or a loading/error placeholder.
 *
 * @example
 * <GroupSubgroupsAttributeLazy group={{ id: "abc123" }} />
 *
 * 
 * @example
 * <GroupSubgroupsAttributeLazy
 *   group={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const GroupSubgroupsAttributeLazy = ({group, filter=Boolean}) => {
    const {loading, error, entity} = useAsyncAction(GroupSubgroupsAttributeAsyncAction, group)
    const values = entity?.subgroups || []
    
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    const valuesToDisplay = values.filter(filter)
    return (<>
        {valuesToDisplay.map(value => <div key={value.id} id={value.id}>
            <pre>{JSON.stringify(value, null, 4)}</pre>
        </div>)}
    </>)
}