import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a MemberofGQLModel item into a user’s memberofs array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `memberofs` array.
 * @param {Object} memberofItem - The item to insert; must have `__typename === "MemberofGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserMemberofItemInsert = (user, memberofItem, dispatch) => {
    const { __typename } = memberofItem;
    if (__typename === "MemberofGQLModel") {
        const { memberofs, ...others } = user;
        const newUserMemberofItems = [...memberofs, memberofItem];
        const newUser = { ...others, memberofs: newUserMemberofItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Replaces an existing MemberofGQLModel item in a user’s memberofs array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `memberofs` array.
 * @param {Object} memberofItem - The updated item; must have `__typename === "MemberofGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserMemberofItemUpdate = (user, memberofItem, dispatch) => {
    const { __typename } = memberofItem;
    if (__typename === "MemberofGQLModel") {
        const { memberofs, ...others } = user;
        const newUserMemberofItems = memberofs.map(item =>
            item.id === memberofItem.id ? memberofItem : item
        );
        const newUser = { ...others, memberofs: newUserMemberofItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Removes a MemberofGQLModel item from a user’s memberofs array by its `id` and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `memberofs` array.
 * @param {Object} memberofItem - The item to delete; must have `__typename === "MemberofGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserMemberofItemDelete = (user, memberofItem, dispatch) => {
    const { __typename } = memberofItem;
    if (__typename === "MemberofGQLModel") {
        const { memberofs, ...others } = user;
        const newUserMemberofItems = memberofs.filter(
            item => item.id !== memberofItem.id
        );
        const newUser = { ...others, memberofs: newUserMemberofItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

const UserMemberofsAttributeQuery = `
query UserQueryRead($id: UUID!, $where: MemberofInputFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        memberofs(skip: $skip, limit: $limit, where: $where) {
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

const UserMemberofsAttributeAsyncAction = createAsyncGraphQLAction(
    UserMemberofsAttributeQuery,
    processVectorAttributeFromGraphQLResult("memberofs")
)

/**
 * A component for displaying the `memberofs` attribute of a user entity.
 *
 * This component checks if the `memberofs` attribute exists on the `user` object. If `memberofs` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `memberofs` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the UserMemberofsAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array<Object>} [props.user.memberofs] - An array of memberof items associated with the user entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the memberofs array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `memberofs` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const userEntity = { 
 *   memberofs: [
 *     { id: 1, name: "Memberof Item 1" }, 
 *     { id: 2, name: "Memberof Item 2" }
 *   ] 
 * };
 * <UserMemberofsAttribute user={userEntity} />
 *
 * @example
 * // With a custom filter:
 * <UserMemberofsAttribute 
 *   user={userEntity}
 *   filter={memberof => memberof.name.includes("1")}
 * />
 */
export const UserMemberofsAttribute = ({user, filter=Boolean}) => {
    const { memberofs: unfiltered } = user
    if (typeof unfiltered === 'undefined') return null
    const memberofs = unfiltered.filter(filter)
    if (memberofs.length === 0) return null
    return (
        <>
            {memberofs.map(
                memberof => <div id={memberof.id} key={memberof.id}>
                    {/* <MemberofMediumCard memberof={memberof} /> */}
                    {/* <MemberofLink memberof={memberof} /> */}
                    Probably {'<MemberofMediumCard memberof={memberof} />'} <br />
                    <pre>{JSON.stringify(memberof, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of memberof items using `UserMemberofsAttribute`.
 *
 * Wraps the `UserMemberofsAttribute` component, passing the given `items` as the `memberofs` attribute
 * on a synthetic `user` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of memberof items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `UserMemberofsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of memberofs or `null` if none are provided.
 *
 * @example
 * <MemberofsVisualiser
 *   items={[
 *     { id: 1, name: "Memberof 1" },
 *     { id: 2, name: "Memberof 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const MemberofsVisualiser = ({ items, ...props }) => 
    <UserMemberofsAttribute {...props} user={{ memberofs: items }} />

/**
 * Infinite-scrolling component for the `memberofs` attribute of a user entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `memberofs` array
 * associated with the provided `user` object. It utilizes `MemberofsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.user - The user entity containing the `memberofs` array.
 * @param {Array<Object>} [props.user.memberofs] - (Optional) Preloaded memberof items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `MemberofsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of memberofs.
 *
 * @example
 * <UserMemberofsAttributeInfinite
 *   user={{
 *     memberofs: [
 *       { id: 1, name: "Memberof 1" },
 *       { id: 2, name: "Memberof 2" }
 *     ]
 *   }}
 * />
 */
export const UserMemberofsAttributeInfinite = ({user, actionParams={}, ...props}) => { 
    const {memberofs} = user

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={MemberofsVisualiser} 
            preloadedItems={memberofs}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={UserMemberofsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `memberofs` from a `user` entity.
 *
 * This component uses the `UserMemberofsAttributeAsyncAction` to asynchronously fetch
 * the `user.memberofs` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each memberof item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.user - The user entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `memberofs` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered memberofs or a loading/error placeholder.
 *
 * @example
 * <UserMemberofsAttributeLazy user={{ id: "abc123" }} />
 *
 * 
 * @example
 * <UserMemberofsAttributeLazy
 *   user={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const UserMemberofsAttributeLazy = ({user, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(UserMemberofsAttributeAsyncAction, user, {deferred: true})
    useEffect(() => {
        fetch(user)
    }, [user])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <UserMemberofsAttribute user={entity} filter={filter} />    
}