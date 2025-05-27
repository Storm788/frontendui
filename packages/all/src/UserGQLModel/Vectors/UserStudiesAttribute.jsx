import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a StudieGQLModel item into a user’s studies array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `studies` array.
 * @param {Object} studieItem - The item to insert; must have `__typename === "StudieGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserStudieItemInsert = (user, studieItem, dispatch) => {
    const { __typename } = studieItem;
    if (__typename === "StudieGQLModel") {
        const { studies, ...others } = user;
        const newUserStudieItems = [...studies, studieItem];
        const newUser = { ...others, studies: newUserStudieItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Replaces an existing StudieGQLModel item in a user’s studies array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `studies` array.
 * @param {Object} studieItem - The updated item; must have `__typename === "StudieGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserStudieItemUpdate = (user, studieItem, dispatch) => {
    const { __typename } = studieItem;
    if (__typename === "StudieGQLModel") {
        const { studies, ...others } = user;
        const newUserStudieItems = studies.map(item =>
            item.id === studieItem.id ? studieItem : item
        );
        const newUser = { ...others, studies: newUserStudieItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Removes a StudieGQLModel item from a user’s studies array by its `id` and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `studies` array.
 * @param {Object} studieItem - The item to delete; must have `__typename === "StudieGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserStudieItemDelete = (user, studieItem, dispatch) => {
    const { __typename } = studieItem;
    if (__typename === "StudieGQLModel") {
        const { studies, ...others } = user;
        const newUserStudieItems = studies.filter(
            item => item.id !== studieItem.id
        );
        const newUser = { ...others, studies: newUserStudieItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

const UserStudiesAttributeQuery = `
query UserQueryRead($id: UUID!, $where: StudieInputFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        studies(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            myId
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            userId
            programId
            stateId
        }
    }
}
`

const UserStudiesAttributeAsyncAction = createAsyncGraphQLAction(
    UserStudiesAttributeQuery,
    processVectorAttributeFromGraphQLResult("studies")
)

/**
 * A component for displaying the `studies` attribute of a user entity.
 *
 * This component checks if the `studies` attribute exists on the `user` object. If `studies` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `studies` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the UserStudiesAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array<Object>} [props.user.studies] - An array of studie items associated with the user entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the studies array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `studies` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const userEntity = { 
 *   studies: [
 *     { id: 1, name: "Studie Item 1" }, 
 *     { id: 2, name: "Studie Item 2" }
 *   ] 
 * };
 * <UserStudiesAttribute user={userEntity} />
 *
 * @example
 * // With a custom filter:
 * <UserStudiesAttribute 
 *   user={userEntity}
 *   filter={studie => studie.name.includes("1")}
 * />
 */
export const UserStudiesAttribute = ({user, filter=Boolean}) => {
    const { studies: unfiltered } = user
    if (typeof unfiltered === 'undefined') return null
    const studies = unfiltered.filter(filter)
    if (studies.length === 0) return null
    return (
        <>
            {studies.map(
                studie => <div id={studie.id} key={studie.id}>
                    {/* <StudieMediumCard studie={studie} /> */}
                    {/* <StudieLink studie={studie} /> */}
                    Probably {'<StudieMediumCard studie={studie} />'} <br />
                    <pre>{JSON.stringify(studie, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of studie items using `UserStudiesAttribute`.
 *
 * Wraps the `UserStudiesAttribute` component, passing the given `items` as the `studies` attribute
 * on a synthetic `user` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of studie items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `UserStudiesAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of studies or `null` if none are provided.
 *
 * @example
 * <StudiesVisualiser
 *   items={[
 *     { id: 1, name: "Studie 1" },
 *     { id: 2, name: "Studie 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const StudiesVisualiser = ({ items, ...props }) => 
    <UserStudiesAttribute {...props} user={{ studies: items }} />

/**
 * Infinite-scrolling component for the `studies` attribute of a user entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `studies` array
 * associated with the provided `user` object. It utilizes `StudiesVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.user - The user entity containing the `studies` array.
 * @param {Array<Object>} [props.user.studies] - (Optional) Preloaded studie items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `StudiesVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of studies.
 *
 * @example
 * <UserStudiesAttributeInfinite
 *   user={{
 *     studies: [
 *       { id: 1, name: "Studie 1" },
 *       { id: 2, name: "Studie 2" }
 *     ]
 *   }}
 * />
 */
export const UserStudiesAttributeInfinite = ({user, actionParams={}, ...props}) => { 
    const {studies} = user

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={StudiesVisualiser} 
            preloadedItems={studies}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={UserStudiesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `studies` from a `user` entity.
 *
 * This component uses the `UserStudiesAttributeAsyncAction` to asynchronously fetch
 * the `user.studies` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each studie item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.user - The user entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `studies` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered studies or a loading/error placeholder.
 *
 * @example
 * <UserStudiesAttributeLazy user={{ id: "abc123" }} />
 *
 * 
 * @example
 * <UserStudiesAttributeLazy
 *   user={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const UserStudiesAttributeLazy = ({user, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(UserStudiesAttributeAsyncAction, user, {deferred: true})
    useEffect(() => {
        fetch(user)
    }, [user])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <UserStudiesAttribute user={entity} filter={filter} />    
}