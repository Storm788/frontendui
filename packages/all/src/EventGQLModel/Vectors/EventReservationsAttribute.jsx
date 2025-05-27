import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a ReservationGQLModel item into a event’s reservations array and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `reservations` array.
 * @param {Object} reservationItem - The item to insert; must have `__typename === "ReservationGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventReservationItemInsert = (event, reservationItem, dispatch) => {
    const { __typename } = reservationItem;
    if (__typename === "ReservationGQLModel") {
        const { reservations, ...others } = event;
        const newEventReservationItems = [...reservations, reservationItem];
        const newEvent = { ...others, reservations: newEventReservationItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

/**
 * Replaces an existing ReservationGQLModel item in a event’s reservations array and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `reservations` array.
 * @param {Object} reservationItem - The updated item; must have `__typename === "ReservationGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventReservationItemUpdate = (event, reservationItem, dispatch) => {
    const { __typename } = reservationItem;
    if (__typename === "ReservationGQLModel") {
        const { reservations, ...others } = event;
        const newEventReservationItems = reservations.map(item =>
            item.id === reservationItem.id ? reservationItem : item
        );
        const newEvent = { ...others, reservations: newEventReservationItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

/**
 * Removes a ReservationGQLModel item from a event’s reservations array by its `id` and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `reservations` array.
 * @param {Object} reservationItem - The item to delete; must have `__typename === "ReservationGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventReservationItemDelete = (event, reservationItem, dispatch) => {
    const { __typename } = reservationItem;
    if (__typename === "ReservationGQLModel") {
        const { reservations, ...others } = event;
        const newEventReservationItems = reservations.filter(
            item => item.id !== reservationItem.id
        );
        const newEvent = { ...others, reservations: newEventReservationItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

const EventReservationsAttributeQuery = `
query EventQueryRead($id: UUID!, $where: ReservationInputFilter, $skip: Int, $limit: Int) {
    result: eventById(id: $id) {
        __typename
        id
        reservations(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            eventId
            facilityId
            stateId
        }
    }
}
`

const EventReservationsAttributeAsyncAction = createAsyncGraphQLAction(
    EventReservationsAttributeQuery,
    processVectorAttributeFromGraphQLResult("reservations")
)

/**
 * A component for displaying the `reservations` attribute of a event entity.
 *
 * This component checks if the `reservations` attribute exists on the `event` object. If `reservations` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `reservations` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the EventReservationsAttribute component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {Array<Object>} [props.event.reservations] - An array of reservation items associated with the event entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the reservations array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `reservations` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const eventEntity = { 
 *   reservations: [
 *     { id: 1, name: "Reservation Item 1" }, 
 *     { id: 2, name: "Reservation Item 2" }
 *   ] 
 * };
 * <EventReservationsAttribute event={eventEntity} />
 *
 * @example
 * // With a custom filter:
 * <EventReservationsAttribute 
 *   event={eventEntity}
 *   filter={reservation => reservation.name.includes("1")}
 * />
 */
export const EventReservationsAttribute = ({event, filter=Boolean}) => {
    const { reservations: unfiltered } = event
    if (typeof unfiltered === 'undefined') return null
    const reservations = unfiltered.filter(filter)
    if (reservations.length === 0) return null
    return (
        <>
            {reservations.map(
                reservation => <div id={reservation.id} key={reservation.id}>
                    {/* <ReservationMediumCard reservation={reservation} /> */}
                    {/* <ReservationLink reservation={reservation} /> */}
                    Probably {'<ReservationMediumCard reservation={reservation} />'} <br />
                    <pre>{JSON.stringify(reservation, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of reservation items using `EventReservationsAttribute`.
 *
 * Wraps the `EventReservationsAttribute` component, passing the given `items` as the `reservations` attribute
 * on a synthetic `event` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of reservation items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `EventReservationsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of reservations or `null` if none are provided.
 *
 * @example
 * <ReservationsVisualiser
 *   items={[
 *     { id: 1, name: "Reservation 1" },
 *     { id: 2, name: "Reservation 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const ReservationsVisualiser = ({ items, ...props }) => 
    <EventReservationsAttribute {...props} event={{ reservations: items }} />

/**
 * Infinite-scrolling component for the `reservations` attribute of a event entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `reservations` array
 * associated with the provided `event` object. It utilizes `ReservationsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.event - The event entity containing the `reservations` array.
 * @param {Array<Object>} [props.event.reservations] - (Optional) Preloaded reservation items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `ReservationsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of reservations.
 *
 * @example
 * <EventReservationsAttributeInfinite
 *   event={{
 *     reservations: [
 *       { id: 1, name: "Reservation 1" },
 *       { id: 2, name: "Reservation 2" }
 *     ]
 *   }}
 * />
 */
export const EventReservationsAttributeInfinite = ({event, actionParams={}, ...props}) => { 
    const {reservations} = event

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={ReservationsVisualiser} 
            preloadedItems={reservations}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={EventReservationsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `reservations` from a `event` entity.
 *
 * This component uses the `EventReservationsAttributeAsyncAction` to asynchronously fetch
 * the `event.reservations` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each reservation item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.event - The event entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `reservations` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered reservations or a loading/error placeholder.
 *
 * @example
 * <EventReservationsAttributeLazy event={{ id: "abc123" }} />
 *
 * 
 * @example
 * <EventReservationsAttributeLazy
 *   event={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const EventReservationsAttributeLazy = ({event, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(EventReservationsAttributeAsyncAction, event, {deferred: true})
    useEffect(() => {
        fetch(event)
    }, [event])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <EventReservationsAttribute event={entity} filter={filter} />    
}