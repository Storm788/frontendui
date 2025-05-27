import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `rbacobject` attribute of an facility entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `facility` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the FacilityRbacobjectAttribute component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {*} [props.facility.rbacobject] - The rbacobject attribute of the facility entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <FacilityRbacobjectAttribute facility={facilityEntity} />
 */
export const FacilityRbacobjectAttribute = ({facility}) => {
    const {rbacobject} = facility
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            {/* <RbacobjectMediumCard rbacobject={rbacobject} /> */}
            {/* <RbacobjectLink rbacobject={rbacobject} /> */}
            Probably {'<RbacobjectMediumCard rbacobject={rbacobject} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}

const FacilityRbacobjectAttributeQuery = `
query FacilityQueryRead($id: UUID!) {
    result: facilityById(id: $id) {
        __typename
        id
        rbacobject {
            __typename
            id
        }
    }
}
`

const FacilityRbacobjectAttributeAsyncAction = createAsyncGraphQLAction(
    FacilityRbacobjectAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `rbacobject` from a `facility` entity.
 *
 * This component uses the `FacilityRbacobjectAttributeAsyncAction` to asynchronously fetch
 * the `facility.rbacobject` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.facility - The facility entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `rbacobject` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered rbacobject or a loading/error placeholder.
 *
 * @example
 * <FacilityRbacobjectAttributeLazy facility={{ id: "abc123" }} />
 *
 * 
 * @example
 * <FacilityRbacobjectAttributeLazy
 *   facility={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const FacilityRbacobjectAttributeLazy = ({facility}) => {
    const {loading, error, entity, fetch} = useAsyncAction(FacilityRbacobjectAttributeAsyncAction, facility)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <FacilityRbacobjectAttribute facility={entity} />    
}