import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const EventURI = `${URIRoot}/event/view/`;

/**
 * A React component that renders a `ProxyLink` to an "event" entity's view page.
 *
 * The target URL is dynamically constructed using the `event` object's `id`, and the link displays
 * the `event` object's `name` as its clickable content.
 *
 * @function EventLink
 * @param {Object} props - The properties for the `EventLink` component.
 * @param {Object} props.event - The object representing the "event" entity.
 * @param {string|number} props.event.id - The unique identifier for the "event" entity. Used to construct the target URL.
 * @param {string} props.event.name - The display name for the "event" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "event" entity's view page.
 *
 * @example
 * // Example usage with a sample event entity:
 * const eventEntity = { id: 123, name: "Example Event Entity" };
 * 
 * <EventLink event={eventEntity} />
 * // Renders: <ProxyLink to="/event/event/view/123">Example Event Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/event/event/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const EventLink = ({event, ...props}) => {
    return <ProxyLink to={EventURI + event.id} {...props}>{event.name}</ProxyLink>
}