import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { UserLink } from "../../User/Components/UserLink"

/**
 * A component for displaying the `users` attribute of an group entity.
 *
 * This component checks if the `users` attribute exists on the `group` object. If `users` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `users` array and
 * displays a placeholder message and a JSON representation for each item in the `users`.
 *
 * @component
 * @param {Object} props - The props for the GroupUsersAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {Array} [props.group.users] - An array of users items associated with the group entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `users` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { 
 *   users: [
 *     { id: 1, name: "User Item 1" }, 
 *     { id: 2, name: "User Item 2" }
 *   ] 
 * };
 *
 * <GroupUsersAttribute group={groupEntity} />
 */
export const GroupUsersAttribute = ({group}) => {
    const { memberships } = group
    if (typeof memberships === 'undefined') return null
    return (
        <>
            {memberships.map(
                membership => <div id={membership.id} key={membership.id}>
                    <UserLink user={membership.user} /> <br />
                    {/* Probably {'<UserMediumCard user=\{user\} />'} <br /> */}
                    {/* {JSON.stringify(membership.user)} */}
                </div>
            )}
        </>
    )
}

const UsersAttributeQuery = `
query GroupQueryRead($id: id, $where: UserInputFilter, $skip: Int, $limit: Int) {
    result: groupById(id: $id) {
        __typename
        id
        users(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const UsersAttributeAsyncAction = createAsyncGraphQLAction(
    UsersAttributeQuery,
    processVectorAttributeFromGraphQLResult("users")
)

export const GroupUsersAttributeInifite = ({group}) => { 
    const {users} = group

    return (
        <InfiniteScroll 
            Visualiser={'UserMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={UsersAttributeAsyncAction}
        />
    )
}