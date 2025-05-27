import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a ReservationGQLModel item into a facility’s reservations array and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `reservations` array.
 * @param {Object} reservationItem - The item to insert; must have `__typename === "ReservationGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilityReservationItemInsert = (facility, reservationItem, dispatch) => {
    const { __typename } = reservationItem;
    if (__typename === "ReservationGQLModel") {
        const { reservations, ...others } = facility;
        const newFacilityReservationItems = [...reservations, reservationItem];
        const newFacility = { ...others, reservations: newFacilityReservationItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

/**
 * Replaces an existing ReservationGQLModel item in a facility’s reservations array and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `reservations` array.
 * @param {Object} reservationItem - The updated item; must have `__typename === "ReservationGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilityReservationItemUpdate = (facility, reservationItem, dispatch) => {
    const { __typename } = reservationItem;
    if (__typename === "ReservationGQLModel") {
        const { reservations, ...others } = facility;
        const newFacilityReservationItems = reservations.map(item =>
            item.id === reservationItem.id ? reservationItem : item
        );
        const newFacility = { ...others, reservations: newFacilityReservationItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

/**
 * Removes a ReservationGQLModel item from a facility’s reservations array by its `id` and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `reservations` array.
 * @param {Object} reservationItem - The item to delete; must have `__typename === "ReservationGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilityReservationItemDelete = (facility, reservationItem, dispatch) => {
    const { __typename } = reservationItem;
    if (__typename === "ReservationGQLModel") {
        const { reservations, ...others } = facility;
        const newFacilityReservationItems = reservations.filter(
            item => item.id !== reservationItem.id
        );
        const newFacility = { ...others, reservations: newFacilityReservationItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

const FacilityReservationsAttributeQuery = `
query FacilityQueryRead($id: UUID!, $where: ReservationInputFilter, $skip: Int, $limit: Int) {
    result: facilityById(id: $id) {
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

const FacilityReservationsAttributeAsyncAction = createAsyncGraphQLAction(
    FacilityReservationsAttributeQuery,
    processVectorAttributeFromGraphQLResult("reservations")
)

/**
 * A component for displaying the `reservations` attribute of a facility entity.
 *
 * This component checks if the `reservations` attribute exists on the `facility` object. If `reservations` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `reservations` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the FacilityReservationsAttribute component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {Array<Object>} [props.facility.reservations] - An array of reservation items associated with the facility entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the reservations array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `reservations` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const facilityEntity = { 
 *   reservations: [
 *     { id: 1, name: "Reservation Item 1" }, 
 *     { id: 2, name: "Reservation Item 2" }
 *   ] 
 * };
 * <FacilityReservationsAttribute facility={facilityEntity} />
 *
 * @example
 * // With a custom filter:
 * <FacilityReservationsAttribute 
 *   facility={facilityEntity}
 *   filter={reservation => reservation.name.includes("1")}
 * />
 */
export const FacilityReservationsAttribute = ({facility, filter=Boolean}) => {
    const { reservations: unfiltered } = facility
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
 * Visualiser component for displaying a list of reservation items using `FacilityReservationsAttribute`.
 *
 * Wraps the `FacilityReservationsAttribute` component, passing the given `items` as the `reservations` attribute
 * on a synthetic `facility` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of reservation items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `FacilityReservationsAttribute` (e.g., `filter`).
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
    <FacilityReservationsAttribute {...props} facility={{ reservations: items }} />

/**
 * Infinite-scrolling component for the `reservations` attribute of a facility entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `reservations` array
 * associated with the provided `facility` object. It utilizes `ReservationsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.facility - The facility entity containing the `reservations` array.
 * @param {Array<Object>} [props.facility.reservations] - (Optional) Preloaded reservation items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `ReservationsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of reservations.
 *
 * @example
 * <FacilityReservationsAttributeInfinite
 *   facility={{
 *     reservations: [
 *       { id: 1, name: "Reservation 1" },
 *       { id: 2, name: "Reservation 2" }
 *     ]
 *   }}
 * />
 */
export const FacilityReservationsAttributeInfinite = ({facility, actionParams={}, ...props}) => { 
    const {reservations} = facility

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={ReservationsVisualiser} 
            preloadedItems={reservations}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={FacilityReservationsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `reservations` from a `facility` entity.
 *
 * This component uses the `FacilityReservationsAttributeAsyncAction` to asynchronously fetch
 * the `facility.reservations` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each reservation item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.facility - The facility entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `reservations` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered reservations or a loading/error placeholder.
 *
 * @example
 * <FacilityReservationsAttributeLazy facility={{ id: "abc123" }} />
 *
 * 
 * @example
 * <FacilityReservationsAttributeLazy
 *   facility={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const FacilityReservationsAttributeLazy = ({facility, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(FacilityReservationsAttributeAsyncAction, facility, {deferred: true})
    useEffect(() => {
        fetch(facility)
    }, [facility])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <FacilityReservationsAttribute facility={entity} filter={filter} />    
}