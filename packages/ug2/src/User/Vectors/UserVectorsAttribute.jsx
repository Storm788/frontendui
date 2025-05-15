import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an user entity.
 *
 * This component checks if the `vectors` attribute exists on the `user` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the UserVectorsAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array} [props.user.vectors] - An array of vectors items associated with the user entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <UserVectorsAttribute user={userEntity} />
 */
export const UserVectorsAttribute = ({user}) => {
    const { vectors } = user
    if (typeof vectors === 'undefined') return null
    return (
        <>
            {vectors.map(
                vector => <div id={vector.id} key={vector.id}>
                    Probably {'<VectorMediumCard vector=\{vector\} />'} <br />
                    {JSON.stringify(vector)}
                </div>
            )}
        </>
    )
}

const UserVectorsAttributeQuery = `
query UserQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
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

export const UserVectorsAttributeInifite = ({user}) => { 
    const {vectors} = user

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={UserVectorsAttributeAsyncAction}
        />
    )
}