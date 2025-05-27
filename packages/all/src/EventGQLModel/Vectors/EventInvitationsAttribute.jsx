import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a InvitationGQLModel item into a event’s invitations array and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `invitations` array.
 * @param {Object} invitationItem - The item to insert; must have `__typename === "InvitationGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventInvitationItemInsert = (event, invitationItem, dispatch) => {
    const { __typename } = invitationItem;
    if (__typename === "InvitationGQLModel") {
        const { invitations, ...others } = event;
        const newEventInvitationItems = [...invitations, invitationItem];
        const newEvent = { ...others, invitations: newEventInvitationItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

/**
 * Replaces an existing InvitationGQLModel item in a event’s invitations array and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `invitations` array.
 * @param {Object} invitationItem - The updated item; must have `__typename === "InvitationGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventInvitationItemUpdate = (event, invitationItem, dispatch) => {
    const { __typename } = invitationItem;
    if (__typename === "InvitationGQLModel") {
        const { invitations, ...others } = event;
        const newEventInvitationItems = invitations.map(item =>
            item.id === invitationItem.id ? invitationItem : item
        );
        const newEvent = { ...others, invitations: newEventInvitationItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

/**
 * Removes a InvitationGQLModel item from a event’s invitations array by its `id` and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `invitations` array.
 * @param {Object} invitationItem - The item to delete; must have `__typename === "InvitationGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventInvitationItemDelete = (event, invitationItem, dispatch) => {
    const { __typename } = invitationItem;
    if (__typename === "InvitationGQLModel") {
        const { invitations, ...others } = event;
        const newEventInvitationItems = invitations.filter(
            item => item.id !== invitationItem.id
        );
        const newEvent = { ...others, invitations: newEventInvitationItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

const EventInvitationsAttributeQuery = `
query EventQueryRead($id: UUID!, $where: InvitationInputFilter, $skip: Int, $limit: Int) {
    result: eventById(id: $id) {
        __typename
        id
        invitations(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            eventId
            userId
            stateId
        }
    }
}
`

const EventInvitationsAttributeAsyncAction = createAsyncGraphQLAction(
    EventInvitationsAttributeQuery,
    processVectorAttributeFromGraphQLResult("invitations")
)

/**
 * A component for displaying the `invitations` attribute of a event entity.
 *
 * This component checks if the `invitations` attribute exists on the `event` object. If `invitations` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `invitations` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the EventInvitationsAttribute component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {Array<Object>} [props.event.invitations] - An array of invitation items associated with the event entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the invitations array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `invitations` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const eventEntity = { 
 *   invitations: [
 *     { id: 1, name: "Invitation Item 1" }, 
 *     { id: 2, name: "Invitation Item 2" }
 *   ] 
 * };
 * <EventInvitationsAttribute event={eventEntity} />
 *
 * @example
 * // With a custom filter:
 * <EventInvitationsAttribute 
 *   event={eventEntity}
 *   filter={invitation => invitation.name.includes("1")}
 * />
 */
export const EventInvitationsAttribute = ({event, filter=Boolean}) => {
    const { invitations: unfiltered } = event
    if (typeof unfiltered === 'undefined') return null
    const invitations = unfiltered.filter(filter)
    if (invitations.length === 0) return null
    return (
        <>
            {invitations.map(
                invitation => <div id={invitation.id} key={invitation.id}>
                    {/* <InvitationMediumCard invitation={invitation} /> */}
                    {/* <InvitationLink invitation={invitation} /> */}
                    Probably {'<InvitationMediumCard invitation={invitation} />'} <br />
                    <pre>{JSON.stringify(invitation, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of invitation items using `EventInvitationsAttribute`.
 *
 * Wraps the `EventInvitationsAttribute` component, passing the given `items` as the `invitations` attribute
 * on a synthetic `event` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of invitation items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `EventInvitationsAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of invitations or `null` if none are provided.
 *
 * @example
 * <InvitationsVisualiser
 *   items={[
 *     { id: 1, name: "Invitation 1" },
 *     { id: 2, name: "Invitation 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const InvitationsVisualiser = ({ items, ...props }) => 
    <EventInvitationsAttribute {...props} event={{ invitations: items }} />

/**
 * Infinite-scrolling component for the `invitations` attribute of a event entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `invitations` array
 * associated with the provided `event` object. It utilizes `InvitationsVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.event - The event entity containing the `invitations` array.
 * @param {Array<Object>} [props.event.invitations] - (Optional) Preloaded invitation items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `InvitationsVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of invitations.
 *
 * @example
 * <EventInvitationsAttributeInfinite
 *   event={{
 *     invitations: [
 *       { id: 1, name: "Invitation 1" },
 *       { id: 2, name: "Invitation 2" }
 *     ]
 *   }}
 * />
 */
export const EventInvitationsAttributeInfinite = ({event, actionParams={}, ...props}) => { 
    const {invitations} = event

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={InvitationsVisualiser} 
            preloadedItems={invitations}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={EventInvitationsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `invitations` from a `event` entity.
 *
 * This component uses the `EventInvitationsAttributeAsyncAction` to asynchronously fetch
 * the `event.invitations` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each invitation item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.event - The event entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `invitations` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered invitations or a loading/error placeholder.
 *
 * @example
 * <EventInvitationsAttributeLazy event={{ id: "abc123" }} />
 *
 * 
 * @example
 * <EventInvitationsAttributeLazy
 *   event={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const EventInvitationsAttributeLazy = ({event, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(EventInvitationsAttributeAsyncAction, event, {deferred: true})
    useEffect(() => {
        fetch(event)
    }, [event])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <EventInvitationsAttribute event={entity} filter={filter} />    
}