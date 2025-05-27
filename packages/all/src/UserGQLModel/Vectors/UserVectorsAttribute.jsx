import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a VectorGQLModel item into a user’s vectors array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `vectors` array.
 * @param {Object} vectorItem - The item to insert; must have `__typename === "VectorGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserVectorItemInsert = (user, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = user;
        const newUserVectorItems = [...vectors, vectorItem];
        const newUser = { ...others, vectors: newUserVectorItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Replaces an existing VectorGQLModel item in a user’s vectors array and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `vectors` array.
 * @param {Object} vectorItem - The updated item; must have `__typename === "VectorGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserVectorItemUpdate = (user, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = user;
        const newUserVectorItems = vectors.map(item =>
            item.id === vectorItem.id ? vectorItem : item
        );
        const newUser = { ...others, vectors: newUserVectorItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

/**
 * Removes a VectorGQLModel item from a user’s vectors array by its `id` and dispatches an update.
 *
 * @param {Object} user - The current user object containing a `vectors` array.
 * @param {Object} vectorItem - The item to delete; must have `__typename === "VectorGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpUserVectorItemDelete = (user, vectorItem, dispatch) => {
    const { __typename } = vectorItem;
    if (__typename === "VectorGQLModel") {
        const { vectors, ...others } = user;
        const newUserVectorItems = vectors.filter(
            item => item.id !== vectorItem.id
        );
        const newUser = { ...others, vectors: newUserVectorItems };
        dispatch(ItemActions.item_update(newUser));
    }
};

const UserVectorsAttributeQuery = `
query UserQueryRead($id: UUID!, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const UserVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    UserVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

/**
 * A component for displaying the `vectors` attribute of a user entity.
 *
 * This component checks if the `vectors` attribute exists on the `user` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `vectors` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the UserVectorsAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array<Object>} [props.user.vectors] - An array of vector items associated with the user entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the vectors array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `vectors` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const userEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 * <UserVectorsAttribute user={userEntity} />
 *
 * @example
 * // With a custom filter:
 * <UserVectorsAttribute 
 *   user={userEntity}
 *   filter={vector => vector.name.includes("1")}
 * />
 */
export const UserVectorsAttribute = ({user, filter=Boolean}) => {
    const { vectors: unfiltered } = user
    if (typeof unfiltered === 'undefined') return null
    const vectors = unfiltered.filter(filter)
    if (vectors.length === 0) return null
    return (
        <>
            {vectors.map(
                vector => <div id={vector.id} key={vector.id}>
                    {/* <VectorMediumCard vector={vector} /> */}
                    {/* <VectorLink vector={vector} /> */}
                    Probably {'<VectorMediumCard vector={vector} />'} <br />
                    <pre>{JSON.stringify(vector, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of vector items using `UserVectorsAttribute`.
 *
 * Wraps the `UserVectorsAttribute` component, passing the given `items` as the `vectors` attribute
 * on a synthetic `user` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of vector items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `UserVectorsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of vectors or `null` if none are provided.
 *
 * @example
 * <VectorsVisualiser
 *   items={[
 *     { id: 1, name: "Vector 1" },
 *     { id: 2, name: "Vector 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const VectorsVisualiser = ({ items, ...props }) => 
    <UserVectorsAttribute {...props} user={{ vectors: items }} />

/**
 * Infinite-scrolling component for the `vectors` attribute of a user entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `vectors` array
 * associated with the provided `user` object. It utilizes `VectorsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.user - The user entity containing the `vectors` array.
 * @param {Array<Object>} [props.user.vectors] - (Optional) Preloaded vector items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `VectorsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of vectors.
 *
 * @example
 * <UserVectorsAttributeInfinite
 *   user={{
 *     vectors: [
 *       { id: 1, name: "Vector 1" },
 *       { id: 2, name: "Vector 2" }
 *     ]
 *   }}
 * />
 */
export const UserVectorsAttributeInfinite = ({user, actionParams={}, ...props}) => { 
    const {vectors} = user

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={VectorsVisualiser} 
            preloadedItems={vectors}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={UserVectorsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `vectors` from a `user` entity.
 *
 * This component uses the `UserVectorsAttributeAsyncAction` to asynchronously fetch
 * the `user.vectors` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.user - The user entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `vectors` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered vectors or a loading/error placeholder.
 *
 * @example
 * <UserVectorsAttributeLazy user={{ id: "abc123" }} />
 *
 * 
 * @example
 * <UserVectorsAttributeLazy
 *   user={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const UserVectorsAttributeLazy = ({user, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(UserVectorsAttributeAsyncAction, user, {deferred: true})
    useEffect(() => {
        fetch(user)
    }, [user])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <UserVectorsAttribute user={entity} filter={filter} />    
}