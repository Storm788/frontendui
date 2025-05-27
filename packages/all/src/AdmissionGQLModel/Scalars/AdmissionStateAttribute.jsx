import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

import { StateLink } from "../../StateGQLModel"
/**
 * A component for displaying the `state` attribute of an admission entity.
 *
 * This component checks if the `state` attribute exists on the `admission` object. If `state` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `state` attribute.
 *
 * @component
 * @param {Object} props - The props for the AdmissionStateAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {*} [props.admission.state] - The state attribute of the admission entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `state` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { state: { id: 1, name: "Sample State" } };
 *
 * <AdmissionStateAttribute admission={admissionEntity} />
 */
export const AdmissionStateAttribute = ({admission}) => {
    const {state} = admission
    if (typeof state === 'undefined') return null
    return (
        <>
            {/* <StateMediumCard state={state} /> */}
            {state && <StateLink state={state} />}
            {/* Probably {'<StateMediumCard state={state} />'} <br /> */}
            {/* <pre>{JSON.stringify(state, null, 4)}</pre> */}
        </>
    )
}

const AdmissionStateAttributeQuery = `
query AdmissionQueryRead($id: UUID!) {
    result: admissionById(id: $id) {
        __typename
        id
        state {
            __typename
            id
            name
        }
    }
}
`

const AdmissionStateAttributeAsyncAction = createAsyncGraphQLAction(
    AdmissionStateAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `state` from a `admission` entity.
 *
 * This component uses the `AdmissionStateAttributeAsyncAction` to asynchronously fetch
 * the `admission.state` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.admission - The admission entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `state` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered state or a loading/error placeholder.
 *
 * @example
 * <AdmissionStateAttributeLazy admission={{ id: "abc123" }} />
 *
 * 
 * @example
 * <AdmissionStateAttributeLazy
 *   admission={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const AdmissionStateAttributeLazy = ({admission}) => {
    const {loading, error, entity, fetch} = useAsyncAction(AdmissionStateAttributeAsyncAction, admission)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <AdmissionStateAttribute admission={entity} />    
}