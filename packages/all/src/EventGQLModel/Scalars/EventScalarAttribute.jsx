import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an event entity.
 *
 * This component checks if the `scalar` attribute exists on the `event` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the EventScalarAttribute component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {*} [props.event.scalar] - The scalar attribute of the event entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const eventEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <EventScalarAttribute event={eventEntity} />
 */
export const EventScalarAttribute = ({event}) => {
    const {scalar} = event
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

const EventScalarAttributeQuery = `
query EventQueryRead($id: UUID!) {
    result: eventById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const EventScalarAttributeAsyncAction = createAsyncGraphQLAction(
    EventScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `event` entity.
 *
 * This component uses the `EventScalarAttributeAsyncAction` to asynchronously fetch
 * the `event.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.event - The event entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <EventScalarAttributeLazy event={{ id: "abc123" }} />
 *
 * 
 * @example
 * <EventScalarAttributeLazy
 *   event={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const EventScalarAttributeLazy = ({event}) => {
    const {loading, error, entity, fetch} = useAsyncAction(EventScalarAttributeAsyncAction, event)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <EventScalarAttribute event={entity} />    
}