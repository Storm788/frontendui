import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `group` attribute of an facility entity.
 *
 * This component checks if the `group` attribute exists on the `facility` object. If `group` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `group` attribute.
 *
 * @component
 * @param {Object} props - The props for the FacilityGroupAttribute component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {*} [props.facility.group] - The group attribute of the facility entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `group` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { group: { id: 1, name: "Sample Group" } };
 *
 * <FacilityGroupAttribute facility={facilityEntity} />
 */
export const FacilityGroupAttribute = ({facility}) => {
    const {group} = facility
    if (typeof group === 'undefined') return null
    return (
        <>
            {/* <GroupMediumCard group={group} /> */}
            {/* <GroupLink group={group} /> */}
            Probably {'<GroupMediumCard group={group} />'} <br />
            <pre>{JSON.stringify(group, null, 4)}</pre>
        </>
    )
}

const FacilityGroupAttributeQuery = `
query FacilityQueryRead($id: UUID!) {
    result: facilityById(id: $id) {
        __typename
        id
        group {
            __typename
            id
        }
    }
}
`

const FacilityGroupAttributeAsyncAction = createAsyncGraphQLAction(
    FacilityGroupAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `group` from a `facility` entity.
 *
 * This component uses the `FacilityGroupAttributeAsyncAction` to asynchronously fetch
 * the `facility.group` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.facility - The facility entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `group` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered group or a loading/error placeholder.
 *
 * @example
 * <FacilityGroupAttributeLazy facility={{ id: "abc123" }} />
 *
 * 
 * @example
 * <FacilityGroupAttributeLazy
 *   facility={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const FacilityGroupAttributeLazy = ({facility}) => {
    const {loading, error, entity, fetch} = useAsyncAction(FacilityGroupAttributeAsyncAction, facility)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <FacilityGroupAttribute facility={entity} />    
}