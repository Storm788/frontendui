import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an facility entity.
 *
 * This component checks if the `scalar` attribute exists on the `facility` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the FacilityScalarAttribute component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {*} [props.facility.scalar] - The scalar attribute of the facility entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <FacilityScalarAttribute facility={facilityEntity} />
 */
export const FacilityScalarAttribute = ({facility}) => {
    const {scalar} = facility
    if (typeof scalar === 'undefined') return null
    return (
        <>
            {/* <ScalarMediumCard scalar={scalar} /> */}
            {/* <ScalarLink scalar={scalar} /> */}
            Probably {'<ScalarMediumCard scalar={scalar} />'} <br />
            <pre>{JSON.stringify(scalar, null, 4)}</pre>
        </>
    )
}

const FacilityScalarAttributeQuery = `
query FacilityQueryRead($id: UUID!) {
    result: facilityById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const FacilityScalarAttributeAsyncAction = createAsyncGraphQLAction(
    FacilityScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `facility` entity.
 *
 * This component uses the `FacilityScalarAttributeAsyncAction` to asynchronously fetch
 * the `facility.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.facility - The facility entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <FacilityScalarAttributeLazy facility={{ id: "abc123" }} />
 *
 * 
 * @example
 * <FacilityScalarAttributeLazy
 *   facility={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const FacilityScalarAttributeLazy = ({facility}) => {
    const {loading, error, entity, fetch} = useAsyncAction(FacilityScalarAttributeAsyncAction, facility)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <FacilityScalarAttribute facility={entity} />    
}