import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `roles` attribute of an group entity.
 *
 * This component checks if the `roles` attribute exists on the `group` object. If `roles` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `roles` array and
 * displays a placeholder message and a JSON representation for each item in the `roles`.
 *
 * @component
 * @param {Object} props - The props for the GroupRolesAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {Array} [props.group.roles] - An array of roles items associated with the group entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `roles` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { 
 *   roles: [
 *     { id: 1, name: "Role Item 1" }, 
 *     { id: 2, name: "Role Item 2" }
 *   ] 
 * };
 *
 * <GroupRolesAttribute group={groupEntity} />
 */
export const GroupRolesAttribute = ({group}) => {
    const { roles } = group
    if (typeof roles === 'undefined') return null
    return (
        <>
            {roles.map(
                role => <div id={role.id} key={role.id}>
                    Probably {'<RoleMediumCard role=\{role\} />'} <br />
                    {JSON.stringify(role)}
                </div>
            )}
        </>
    )
}

const RolesAttributeQuery = `
query GroupQueryRead($id: id, $where: RoleInputFilter, $skip: Int, $limit: Int) {
    result: groupById(id: $id) {
        __typename
        id
        roles(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const RolesAttributeAsyncAction = createAsyncGraphQLAction(
    RolesAttributeQuery,
    processVectorAttributeFromGraphQLResult("roles")
)

export const GroupRolesAttributeInifite = ({group}) => { 
    const {roles} = group

    return (
        <InfiniteScroll 
            Visualiser={'RoleMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={RolesAttributeAsyncAction}
        />
    )
}