import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `createdby` attribute of an admission entity.
 *
 * This component checks if the `createdby` attribute exists on the `admission` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the AdmissionCreatedbyAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {*} [props.admission.createdby] - The createdby attribute of the admission entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <AdmissionCreatedbyAttribute admission={admissionEntity} />
 */
export const AdmissionCreatedbyAttribute = ({admission}) => {
    const {createdby} = admission
    if (typeof createdby === 'undefined') return null
    return (
        <>
            {/* <CreatedbyMediumCard createdby={createdby} /> */}
            {/* <CreatedbyLink createdby={createdby} /> */}
            Probably {'<CreatedbyMediumCard createdby={createdby} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}

const AdmissionCreatedbyAttributeQuery = `
query AdmissionQueryRead($id: UUID!) {
    result: admissionById(id: $id) {
        __typename
        id
        createdby {
            __typename
            id
        }
    }
}
`

const AdmissionCreatedbyAttributeAsyncAction = createAsyncGraphQLAction(
    AdmissionCreatedbyAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `createdby` from a `admission` entity.
 *
 * This component uses the `AdmissionCreatedbyAttributeAsyncAction` to asynchronously fetch
 * the `admission.createdby` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.admission - The admission entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `createdby` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered createdby or a loading/error placeholder.
 *
 * @example
 * <AdmissionCreatedbyAttributeLazy admission={{ id: "abc123" }} />
 *
 * 
 * @example
 * <AdmissionCreatedbyAttributeLazy
 *   admission={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const AdmissionCreatedbyAttributeLazy = ({admission}) => {
    const {loading, error, entity, fetch} = useAsyncAction(AdmissionCreatedbyAttributeAsyncAction, admission)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <AdmissionCreatedbyAttribute admission={entity} />    
}