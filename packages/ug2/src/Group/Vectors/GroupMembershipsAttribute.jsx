import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `memberships` attribute of an group entity.
 *
 * This component checks if the `memberships` attribute exists on the `group` object. If `memberships` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `memberships` array and
 * displays a placeholder message and a JSON representation for each item in the `memberships`.
 *
 * @component
 * @param {Object} props - The props for the GroupMembershipsAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {Array} [props.group.memberships] - An array of memberships items associated with the group entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `memberships` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { 
 *   memberships: [
 *     { id: 1, name: "Membership Item 1" }, 
 *     { id: 2, name: "Membership Item 2" }
 *   ] 
 * };
 *
 * <GroupMembershipsAttribute group={groupEntity} />
 */
export const GroupMembershipsAttribute = ({group}) => {
    const { memberships } = group
    if (typeof memberships === 'undefined') return null
    return (
        <>
            {memberships.map(
                membership => <div id={membership.id} key={membership.id}>
                    Probably {'<MembershipMediumCard membership=\{membership\} />'} <br />
                    {JSON.stringify(membership)}
                </div>
            )}
        </>
    )
}

const MembershipsAttributeQuery = `
query GroupQueryRead($id: id, $where: MembershipInputFilter, $skip: Int, $limit: Int) {
    result: groupById(id: $id) {
        __typename
        id
        memberships(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const MembershipsAttributeAsyncAction = createAsyncGraphQLAction(
    MembershipsAttributeQuery,
    processVectorAttributeFromGraphQLResult("memberships")
)

export const GroupMembershipsAttributeInifite = ({group}) => { 
    const {memberships} = group

    return (
        <InfiniteScroll 
            Visualiser={'MembershipMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={MembershipsAttributeAsyncAction}
        />
    )
}