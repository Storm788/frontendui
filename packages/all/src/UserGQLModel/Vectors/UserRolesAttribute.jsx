import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { Col, Row } from "react-bootstrap";
import { GroupLink } from "../../GroupGQLModel";

/**
 * Inserts a RoleGQLModel item into a user’s roles array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `roles` array.
 * @param {Object} roleItem - The item to insert; must have `__typename === "RoleGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserRoleItemInsert = (user, roleItem, dispatch) => {
    const { __typename } = roleItem;
    if (__typename === "RoleGQLModel") {
        const { roles, ...others } = user;
        const newUserRoleItems = [...roles, roleItem];
        const newUser = { ...others, roles: newUserRoleItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Replaces an existing RoleGQLModel item in a user’s roles array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `roles` array.
 * @param {Object} roleItem - The updated item; must have `__typename === "RoleGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserRoleItemUpdate = (user, roleItem, dispatch) => {
    const { __typename } = roleItem;
    if (__typename === "RoleGQLModel") {
        const { roles, ...others } = user;
        const newUserRoleItems = roles.map(item =>
            item.id === roleItem.id ? roleItem : item
        );
        const newUser = { ...others, roles: newUserRoleItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Removes a RoleGQLModel item from a user’s roles array by its `id` and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `roles` array.
 * @param {Object} roleItem - The item to delete; must have `__typename === "RoleGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserRoleItemDelete = (user, roleItem, dispatch) => {
    const { __typename } = roleItem;
    if (__typename === "RoleGQLModel") {
        const { roles, ...others } = user;
        const newUserRoleItems = roles.filter(
            item => item.id !== roleItem.id
        );
        const newUser = { ...others, roles: newUserRoleItems };
        dispatch(ItemActions.item_update(newUser));
    }
};


/**
 * A component for displaying the `roles` attribute of an user entity.
 *
 * This component checks if the `roles` attribute exists on the `user` object. If `roles` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `roles` array and
 * displays a placeholder message and a JSON representation for each item in the `roles`.
 *
 * @component
 * @param {Object} props - The props for the UserRolesAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array} [props.user.roles] - An array of roles items associated with the user entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `roles` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { 
 *   roles: [
 *     { id: 1, name: "Role Item 1" }, 
 *     { id: 2, name: "Role Item 2" }
 *   ] 
 * };
 *
 * <UserRolesAttribute user={userEntity} />
 */
export const UserRolesAttribute = ({user}) => {
    const { roles } = user
    if (typeof roles === 'undefined') return null
    return (
        <>
            {roles.map(
                role => <div id={role.id} key={role.id}>
                    Probably {'<RoleMediumCard role=\{role\} />'} <br />
                    <pre>{JSON.stringify(role, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

const UserRolesAttributeQuery = `
query UserQueryRead($id: UUID!, $where: RoleInputWhereFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        roles(skip: $skip, limit: $limit, where: $where) {
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
            roletype {
                id
                name
            }
            userId
            groupId
            group {
                id
                name
            }
        }
    }
}
`

const UserRolesAttributeAsyncAction = createAsyncGraphQLAction(
    UserRolesAttributeQuery,
    processVectorAttributeFromGraphQLResult("roles")
)

export const UserRolesAttributeInfinite = ({user}) => { 
    const {roles} = user

    return (
        <InfiniteScroll 
            Visualiser={'RoleMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={UserRolesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `roles` from a `user` entity.
 *
 * This component uses the `UserRolesAttributeAsyncAction` to asynchronously fetch
 * the `user.roles` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each role item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.user - The user entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `roles` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered roles or a loading/error placeholder.
 *
 * @example
 * <UserRolesAttributeLazy user={{ id: "abc123" }} />
 *
 * 
 * @example
 * <UserRolesAttributeLazy
 *   user={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const UserRolesAttributeLazy = ({user, filter=Boolean}) => {
    const {loading, error, entity} = useAsyncAction(UserRolesAttributeAsyncAction, user)
    const values = entity?.roles || []
    
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    const valuesToDisplay = values.filter(filter)
    return (<>
        {valuesToDisplay.map(role => <div key={role.id} id={role.id}>
            {role?.group && (<>
                 <Row>
                    <Col>
                        <b>{role?.roletype?.name}</b>
                    </Col>
                    <Col>
                        {role?.group && <GroupLink group={role?.group} />}
                    </Col>
                 </Row>

            </>)}            
            {/* <pre>{JSON.stringify(role, null, 4)}</pre> */}
        </div>)}
    </>)
}