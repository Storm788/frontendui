import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * EventChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `event` entity along with other props to all child elements.
 * This component is useful for injecting a common `event` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the EventChildren component.
 * @param {any} props.event - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `event` entity.
 *
 * @example
 * // Example usage:
 * const eventEntity = { id: 1, message: "No data available" };
 *
 * <EventChildren event={eventEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </EventChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'event' prop with the specified entity.
 */
export const EventChildren = ({event, children, ...props}) => <ChildWrapper event={event} children={children} {...props} />