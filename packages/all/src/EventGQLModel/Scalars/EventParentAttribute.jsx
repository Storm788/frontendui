import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `parent` attribute of an event entity.
 *
 * This component checks if the `parent` attribute exists on the `event` object. If `parent` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `parent` attribute.
 *
 * @component
 * @param {Object} props - The props for the EventParentAttribute component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {*} [props.event.parent] - The parent attribute of the event entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `parent` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const eventEntity = { parent: { id: 1, name: "Sample Parent" } };
 *
 * <EventParentAttribute event={eventEntity} />
 */
export const EventParentAttribute = ({event}) => {
    const {parent} = event
    if (typeof parent === 'undefined') return null
    return (
        <>
            {/* <ParentMediumCard parent={parent} /> */}
            {/* <ParentLink parent={parent} /> */}
            Probably {'<ParentMediumCard parent={parent} />'} <br />
            <pre>{JSON.stringify(parent, null, 4)}</pre>
        </>
    )
}

const EventParentAttributeQuery = `
query EventQueryRead($id: UUID!) {
    result: eventById(id: $id) {
        __typename
        id
        parent {
            __typename
            id
        }
    }
}
`

const EventParentAttributeAsyncAction = createAsyncGraphQLAction(
    EventParentAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `parent` from a `event` entity.
 *
 * This component uses the `EventParentAttributeAsyncAction` to asynchronously fetch
 * the `event.parent` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.event - The event entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `parent` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered parent or a loading/error placeholder.
 *
 * @example
 * <EventParentAttributeLazy event={{ id: "abc123" }} />
 *
 * 
 * @example
 * <EventParentAttributeLazy
 *   event={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const EventParentAttributeLazy = ({event}) => {
    const {loading, error, entity, fetch} = useAsyncAction(EventParentAttributeAsyncAction, event)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <EventParentAttribute event={entity} />    
}