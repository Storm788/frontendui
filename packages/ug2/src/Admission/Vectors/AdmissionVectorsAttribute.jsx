import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an admission entity.
 *
 * This component checks if the `vectors` attribute exists on the `admission` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the AdmissionVectorsAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {Array} [props.admission.vectors] - An array of vectors items associated with the admission entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <AdmissionVectorsAttribute admission={admissionEntity} />
 */
export const AdmissionVectorsAttribute = ({admission}) => {
    const { vectors } = admission
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

const AdmissionVectorsAttributeQuery = `
query AdmissionQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: admissionById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const AdmissionVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    AdmissionVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const AdmissionVectorsAttributeInfinite = ({admission}) => { 
    const {vectors} = admission

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={AdmissionVectorsAttributeAsyncAction}
        />
    )
}