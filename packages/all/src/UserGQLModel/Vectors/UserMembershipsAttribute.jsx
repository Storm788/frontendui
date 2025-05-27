import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { GroupMediumCard } from "../../GroupGQLModel";

/**
 * Inserts a MembershipGQLModel item into a user’s memberships array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `memberships` array.
 * @param {Object} membershipItem - The item to insert; must have `__typename === "MembershipGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserMembershipItemInsert = (user, membershipItem, dispatch) => {
    const { __typename } = membershipItem;
    if (__typename === "MembershipGQLModel") {
        const { memberships, ...others } = user;
        const newUserMembershipItems = [...memberships, membershipItem];
        const newUser = { ...others, memberships: newUserMembershipItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Replaces an existing MembershipGQLModel item in a user’s memberships array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `memberships` array.
 * @param {Object} membershipItem - The updated item; must have `__typename === "MembershipGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserMembershipItemUpdate = (user, membershipItem, dispatch) => {
    const { __typename } = membershipItem;
    if (__typename === "MembershipGQLModel") {
        const { memberships, ...others } = user;
        const newUserMembershipItems = memberships.map(item =>
            item.id === membershipItem.id ? membershipItem : item
        );
        const newUser = { ...others, memberships: newUserMembershipItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Removes a MembershipGQLModel item from a user’s memberships array by its `id` and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `memberships` array.
 * @param {Object} membershipItem - The item to delete; must have `__typename === "MembershipGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserMembershipItemDelete = (user, membershipItem, dispatch) => {
    const { __typename } = membershipItem;
    if (__typename === "MembershipGQLModel") {
        const { memberships, ...others } = user;
        const newUserMembershipItems = memberships.filter(
            item => item.id !== membershipItem.id
        );
        const newUser = { ...others, memberships: newUserMembershipItems };
        dispatch(ItemActions.item_update(newUser));
    }
};


/**
 * A component for displaying the `memberships` attribute of an user entity.
 *
 * This component checks if the `memberships` attribute exists on the `user` object. If `memberships` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `memberships` array and
 * displays a placeholder message and a JSON representation for each item in the `memberships`.
 *
 * @component
 * @param {Object} props - The props for the UserMembershipsAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array} [props.user.memberships] - An array of memberships items associated with the user entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `memberships` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { 
 *   memberships: [
 *     { id: 1, name: "Membership Item 1" }, 
 *     { id: 2, name: "Membership Item 2" }
 *   ] 
 * };
 *
 * <UserMembershipsAttribute user={userEntity} />
 */
export const UserMembershipsAttribute = ({user}) => {
    const { memberships } = user
    if (typeof memberships === 'undefined') return null
    return (
        <>
            {memberships.map(
                membership => <div id={membership.id} key={membership.id}>
                    {membership?.group && <GroupMediumCard group={membership.group} />}
                </div>
            )}
        </>
    )
}

const UserMembershipsAttributeQuery = `
query UserQueryRead($id: id, $where: MembershipInputFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        memberships(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            userId
            groupId
            startdate
            enddate
        }
    }
}
`

const UserMembershipsAttributeAsyncAction = createAsyncGraphQLAction(
    UserMembershipsAttributeQuery,
    processVectorAttributeFromGraphQLResult("memberships")
)

export const UserMembershipsAttributeInfinite = ({user}) => { 
    const {memberships} = user

    return (
        <InfiniteScroll 
            Visualiser={'MembershipMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={UserMembershipsAttributeAsyncAction}
        />
    )
}