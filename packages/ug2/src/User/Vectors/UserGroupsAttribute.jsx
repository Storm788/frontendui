import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { GroupLink } from "../../Group"

/**
 * A component for displaying the `groups` attribute of an user entity.
 *
 * This component checks if the `groups` attribute exists on the `user` object. If `groups` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `groups` array and
 * displays a placeholder message and a JSON representation for each item in the `groups`.
 *
 * @component
 * @param {Object} props - The props for the UserGroupsAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array} [props.user.groups] - An array of groups items associated with the user entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `groups` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { 
 *   groups: [
 *     { id: 1, name: "Group Item 1" }, 
 *     { id: 2, name: "Group Item 2" }
 *   ] 
 * };
 *
 * <UserGroupsAttribute user={userEntity} />
 */
export const UserGroupsAttribute = ({user}) => {
    const { memberships } = user
    if (typeof memberships === 'undefined') return null
    return (
        <>
            {memberships.map(
                membership => <div id={membership.id} key={membership.id}>
                    {/* Probably {'<GroupMediumCard group=\{group\} />'} <br /> */}
                    <b>{membership?.group?.grouptype?.name}</b> <GroupLink group={membership.group} /> <br />
                    {/* {JSON.stringify(group)} */}
                </div>
            )}
        </>
    )
}

const GroupsAttributeQuery = `
query UserQueryRead($id: id, $where: GroupInputFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        groups(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const GroupsAttributeAsyncAction = createAsyncGraphQLAction(
    GroupsAttributeQuery,
    processVectorAttributeFromGraphQLResult("groups")
)

export const UserGroupsAttributeInifite = ({user}) => { 
    const {groups} = user

    return (
        <InfiniteScroll 
            Visualiser={'GroupMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={GroupsAttributeAsyncAction}
        />
    )
}