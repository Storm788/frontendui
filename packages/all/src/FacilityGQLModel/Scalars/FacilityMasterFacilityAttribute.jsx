import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `masterfacility` attribute of an facility entity.
 *
 * This component checks if the `masterfacility` attribute exists on the `facility` object. If `masterfacility` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `masterfacility` attribute.
 *
 * @component
 * @param {Object} props - The props for the FacilityMasterfacilityAttribute component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {*} [props.facility.masterfacility] - The masterfacility attribute of the facility entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `masterfacility` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { masterfacility: { id: 1, name: "Sample Masterfacility" } };
 *
 * <FacilityMasterfacilityAttribute facility={facilityEntity} />
 */
export const FacilityMasterfacilityAttribute = ({facility}) => {
    const {masterfacility} = facility
    if (typeof masterfacility === 'undefined') return null
    return (
        <>
            {/* <MasterfacilityMediumCard masterfacility={masterfacility} /> */}
            {/* <MasterfacilityLink masterfacility={masterfacility} /> */}
            Probably {'<MasterfacilityMediumCard masterfacility={masterfacility} />'} <br />
            <pre>{JSON.stringify(masterfacility, null, 4)}</pre>
        </>
    )
}

const FacilityMasterfacilityAttributeQuery = `
query FacilityQueryRead($id: UUID!) {
    result: facilityById(id: $id) {
        __typename
        id
        masterfacility {
            __typename
            id
        }
    }
}
`

const FacilityMasterfacilityAttributeAsyncAction = createAsyncGraphQLAction(
    FacilityMasterfacilityAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `masterfacility` from a `facility` entity.
 *
 * This component uses the `FacilityMasterfacilityAttributeAsyncAction` to asynchronously fetch
 * the `facility.masterfacility` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.facility - The facility entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `masterfacility` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered masterfacility or a loading/error placeholder.
 *
 * @example
 * <FacilityMasterfacilityAttributeLazy facility={{ id: "abc123" }} />
 *
 * 
 * @example
 * <FacilityMasterfacilityAttributeLazy
 *   facility={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const FacilityMasterfacilityAttributeLazy = ({facility}) => {
    const {loading, error, entity, fetch} = useAsyncAction(FacilityMasterfacilityAttributeAsyncAction, facility)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <FacilityMasterfacilityAttribute facility={entity} />    
}