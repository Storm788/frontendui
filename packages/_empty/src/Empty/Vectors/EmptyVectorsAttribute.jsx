import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an empty entity.
 *
 * This component checks if the `vectors` attribute exists on the `empty` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the EmptyVectorsAttribute component.
 * @param {Object} props.empty - The object representing the empty entity.
 * @param {Array} [props.empty.vectors] - An array of vectors items associated with the empty entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const emptyEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <EmptyVectorsAttribute empty={emptyEntity} />
 */
export const EmptyVectorsAttribute = ({empty}) => {
    const { vectors } = empty
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

const EmptyVectorsAttributeQuery = `
query EmptyQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: emptyById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const EmptyVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    EmptyVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const EmptyVectorsAttributeInfinite = ({empty}) => { 
    const {vectors} = empty

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={EmptyVectorsAttributeAsyncAction}
        />
    )
}