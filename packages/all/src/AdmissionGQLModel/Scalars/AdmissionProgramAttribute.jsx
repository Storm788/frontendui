import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `program` attribute of an admission entity.
 *
 * This component checks if the `program` attribute exists on the `admission` object. If `program` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `program` attribute.
 *
 * @component
 * @param {Object} props - The props for the AdmissionProgramAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {*} [props.admission.program] - The program attribute of the admission entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `program` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { program: { id: 1, name: "Sample Program" } };
 *
 * <AdmissionProgramAttribute admission={admissionEntity} />
 */
export const AdmissionProgramAttribute = ({admission}) => {
    const {program} = admission
    if (typeof program === 'undefined') return null
    return (
        <>
            {/* <ProgramMediumCard program={program} /> */}
            {/* <ProgramLink program={program} /> */}
            Probably {'<ProgramMediumCard program={program} />'} <br />
            <pre>{JSON.stringify(program, null, 4)}</pre>
        </>
    )
}

const AdmissionProgramAttributeQuery = `
query AdmissionQueryRead($id: UUID!) {
    result: admissionById(id: $id) {
        __typename
        id
        program {
            __typename
            id
        }
    }
}
`

const AdmissionProgramAttributeAsyncAction = createAsyncGraphQLAction(
    AdmissionProgramAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `program` from a `admission` entity.
 *
 * This component uses the `AdmissionProgramAttributeAsyncAction` to asynchronously fetch
 * the `admission.program` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.admission - The admission entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `program` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered program or a loading/error placeholder.
 *
 * @example
 * <AdmissionProgramAttributeLazy admission={{ id: "abc123" }} />
 *
 * 
 * @example
 * <AdmissionProgramAttributeLazy
 *   admission={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const AdmissionProgramAttributeLazy = ({admission}) => {
    const {loading, error, entity, fetch} = useAsyncAction(AdmissionProgramAttributeAsyncAction, admission)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <AdmissionProgramAttribute admission={entity} />    
}