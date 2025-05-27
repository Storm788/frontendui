import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `facility` attribute of an event entity.
 *
 * This component checks if the `facility` attribute exists on the `event` object. If `facility` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `facility` attribute.
 *
 * @component
 * @param {Object} props - The props for the EventFacilityAttribute component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {*} [props.event.facility] - The facility attribute of the event entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `facility` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const eventEntity = { facility: { id: 1, name: "Sample Facility" } };
 *
 * <EventFacilityAttribute event={eventEntity} />
 */
export const EventFacilityAttribute = ({event}) => {
    const {facility} = event
    if (typeof facility === 'undefined') return null
    return (
        <>
            {/* <FacilityMediumCard facility={facility} /> */}
            {/* <FacilityLink facility={facility} /> */}
            Probably {'<FacilityMediumCard facility={facility} />'} <br />
            <pre>{JSON.stringify(facility, null, 4)}</pre>
        </>
    )
}

const EventFacilityAttributeQuery = `
query EventQueryRead($id: UUID!) {
    result: eventById(id: $id) {
        __typename
        id
        facility {
            __typename
            id
        }
    }
}
`

const EventFacilityAttributeAsyncAction = createAsyncGraphQLAction(
    EventFacilityAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `facility` from a `event` entity.
 *
 * This component uses the `EventFacilityAttributeAsyncAction` to asynchronously fetch
 * the `event.facility` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.event - The event entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `facility` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered facility or a loading/error placeholder.
 *
 * @example
 * <EventFacilityAttributeLazy event={{ id: "abc123" }} />
 *
 * 
 * @example
 * <EventFacilityAttributeLazy
 *   event={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const EventFacilityAttributeLazy = ({event}) => {
    const {loading, error, entity, fetch} = useAsyncAction(EventFacilityAttributeAsyncAction, event)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <EventFacilityAttribute event={entity} />    
}