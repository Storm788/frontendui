import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an student entity.
 *
 * This component checks if the `vectors` attribute exists on the `student` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the StudentVectorsAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {Array} [props.student.vectors] - An array of vectors items associated with the student entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <StudentVectorsAttribute student={studentEntity} />
 */
export const StudentVectorsAttribute = ({student}) => {
    const { vectors } = student
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

const StudentVectorsAttributeQuery = `
query StudentQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: studentById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudentVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    StudentVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const StudentVectorsAttributeInfinite = ({student}) => { 
    const {vectors} = student

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudentVectorsAttributeAsyncAction}
        />
    )
}