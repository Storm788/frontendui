import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { PaymentInfoLink, PaymentInfoMediumCard, PaymentInfoMediumContent } from "../../PaymentInfoGQLModel"
/**
 * A component for displaying the `paymentInfo` attribute of an admission entity.
 *
 * This component checks if the `paymentInfo` attribute exists on the `admission` object. If `paymentInfo` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `paymentInfo` attribute.
 *
 * @component
 * @param {Object} props - The props for the AdmissionPaymentinfoAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {*} [props.admission.paymentInfo] - The paymentInfo attribute of the admission entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `paymentInfo` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { paymentInfo: { id: 1, name: "Sample Paymentinfo" } };
 *
 * <AdmissionPaymentinfoAttribute admission={admissionEntity} />
 */
export const AdmissionPaymentinfoAttribute = ({admission}) => {
    const {paymentInfo} = admission
    if (typeof paymentInfo === 'undefined') return "Chybí paymentInfo"
    if (!paymentInfo) return "Chybí paymentInfo"
    return (
        <>
            <PaymentInfoMediumContent paymentInfo={paymentInfo} />
            {/* <PaymentInfoLink paymentInfo={paymentInfo} /> */}
            {/* Probably {'<paymentInfoMediumCard paymentInfo={paymentInfo} />'} <br /> */}
            {/* <pre>{JSON.stringify(paymentInfo, null, 4)}</pre> */}
        </>
    )
}

const AdmissionPaymentinfoAttributeQuery = `
query AdmissionQueryRead($id: UUID!) {
    result: admissionById(id: $id) {
        __typename
        id
        paymentInfo {
            __typename
            id
        }
    }
}
`

const AdmissionPaymentinfoAttributeAsyncAction = createAsyncGraphQLAction(
    AdmissionPaymentinfoAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `paymentInfo` from a `admission` entity.
 *
 * This component uses the `AdmissionPaymentinfoAttributeAsyncAction` to asynchronously fetch
 * the `admission.paymentInfo` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.admission - The admission entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `paymentInfo` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered paymentInfo or a loading/error placeholder.
 *
 * @example
 * <AdmissionPaymentinfoAttributeLazy admission={{ id: "abc123" }} />
 *
 * 
 * @example
 * <AdmissionPaymentinfoAttributeLazy
 *   admission={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const AdmissionPaymentinfoAttributeLazy = ({admission}) => {
    const {loading, error, entity, fetch} = useAsyncAction(AdmissionPaymentinfoAttributeAsyncAction, admission)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <AdmissionPaymentinfoAttribute admission={entity} />    
}