import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { UserLink } from "../../UserGQLModel";


/**
 * Inserts a RolesonGQLModel item into a group’s rolesons array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `rolesons` array.
 * @param {Object} rolesonItem - The item to insert; must have `__typename === "RolesonGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupRolesonItemInsert = (group, rolesonItem, dispatch) => {
    const { __typename } = rolesonItem;
    if (__typename === "RolesonGQLModel") {
        const { rolesons, ...others } = group;
        const newGroupRolesonItems = [...rolesons, rolesonItem];
        const newGroup = { ...others, rolesons: newGroupRolesonItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Replaces an existing RolesonGQLModel item in a group’s rolesons array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `rolesons` array.
 * @param {Object} rolesonItem - The updated item; must have `__typename === "RolesonGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupRolesonItemUpdate = (group, rolesonItem, dispatch) => {
    const { __typename } = rolesonItem;
    if (__typename === "RolesonGQLModel") {
        const { rolesons, ...others } = group;
        const newGroupRolesonItems = rolesons.map(item =>
            item.id === rolesonItem.id ? rolesonItem : item
        );
        const newGroup = { ...others, rolesons: newGroupRolesonItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Removes a RolesonGQLModel item from a group’s rolesons array by its `id` and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `rolesons` array.
 * @param {Object} rolesonItem - The item to delete; must have `__typename === "RolesonGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupRolesonItemDelete = (group, rolesonItem, dispatch) => {
    const { __typename } = rolesonItem;
    if (__typename === "RolesonGQLModel") {
        const { rolesons, ...others } = group;
        const newGroupRolesonItems = rolesons.filter(
            item => item.id !== rolesonItem.id
        );
        const newGroup = { ...others, rolesons: newGroupRolesonItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};


/**
 * A component for displaying the `rolesons` attribute of an group entity.
 *
 * This component checks if the `rolesons` attribute exists on the `group` object. If `rolesons` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `rolesons` array and
 * displays a placeholder message and a JSON representation for each item in the `rolesons`.
 *
 * @component
 * @param {Object} props - The props for the GroupRolesonsAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {Array} [props.group.rolesons] - An array of rolesons items associated with the group entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rolesons` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { 
 *   rolesons: [
 *     { id: 1, name: "Roleson Item 1" }, 
 *     { id: 2, name: "Roleson Item 2" }
 *   ] 
 * };
 *
 * <GroupRolesonsAttribute group={groupEntity} />
 */
export const GroupRolesonsAttribute = ({group}) => {
    const { rolesons } = group
    if (typeof rolesons === 'undefined') return null
    return (
        <>
            {rolesons.map(
                roleson => <div id={roleson.id} key={roleson.id}>
                    Probably {'<RolesonMediumCard roleson=\{roleson\} />'} <br />
                    <pre>{JSON.stringify(roleson, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

const GroupRolesonsAttributeQuery = `
query GroupQueryRead($id: UUID!) {
  result: groupById(id: $id) {
    __typename
    id
    rolesOn {
      __typename
      id
      lastchange
      created
      createdbyId
      changedbyId
      rbacobjectId
      startdate
      enddate
      roletypeId
      userId
      user {
        id
        fullname
        email
      }
      roletype {
        id
        name
      }
      groupId
      valid
    }
  }
}
`

const GroupRolesonsAttributeAsyncAction = createAsyncGraphQLAction(
    GroupRolesonsAttributeQuery,
    processVectorAttributeFromGraphQLResult("rolesOn")
)

export const GroupRolesonsAttributeInfinite = ({group}) => { 
    const {rolesons} = group

    return (
        <InfiniteScroll 
            Visualiser={'RolesonMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={GroupRolesonsAttributeAsyncAction}
        />
    )
}


export const GroupRolesOnAttributeLazy = ({group, filter=Boolean}) => {
    const {loading, error, entity} = useAsyncAction(GroupRolesonsAttributeAsyncAction, group)
    const values = entity?.rolesOn || []
    
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    const valuesToDisplay = values.filter(filter)
    return (<>
        {valuesToDisplay.map(role => <div key={role.id}>
            {/* {JSON.stringify(role.user)} */}
            {role?.user && (<>
                <b>{role?.roletype?.name}:</b> &nbsp;
                <UserLink user={role?.user}>
                    {/* {JSON.stringify(role)} */}
                </UserLink>
            </>)}
        </div>)}
        {/* {JSON.stringify(valuesToDisplay)} */}
    </>)
}