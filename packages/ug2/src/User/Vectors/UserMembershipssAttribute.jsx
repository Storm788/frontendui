import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `membershipss` attribute of an user entity.
 *
 * This component checks if the `membershipss` attribute exists on the `user` object. If `membershipss` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `membershipss` array and
 * displays a placeholder message and a JSON representation for each item in the `membershipss`.
 *
 * @component
 * @param {Object} props - The props for the UserMembershipssAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array} [props.user.membershipss] - An array of membershipss items associated with the user entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `membershipss` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { 
 *   membershipss: [
 *     { id: 1, name: "Memberships Item 1" }, 
 *     { id: 2, name: "Memberships Item 2" }
 *   ] 
 * };
 *
 * <UserMembershipssAttribute user={userEntity} />
 */
export const UserMembershipssAttribute = ({user}) => {
    const { membershipss } = user
    if (typeof membershipss === 'undefined') return null
    return (
        <>
            {membershipss.map(
                memberships => <div id={memberships.id} key={memberships.id}>
                    Probably {'<MembershipsMediumCard memberships=\{memberships\} />'} <br />
                    {JSON.stringify(memberships)}
                </div>
            )}
        </>
    )
}

const MembershipssAttributeQuery = `
query UserQueryRead($id: id, $where: MembershipsInputFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        membershipss(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const MembershipssAttributeAsyncAction = createAsyncGraphQLAction(
    MembershipssAttributeQuery,
    processVectorAttributeFromGraphQLResult("membershipss")
)

export const UserMembershipssAttributeInifite = ({user}) => { 
    const {membershipss} = user

    return (
        <InfiniteScroll 
            Visualiser={'MembershipsMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={MembershipssAttributeAsyncAction}
        />
    )
}