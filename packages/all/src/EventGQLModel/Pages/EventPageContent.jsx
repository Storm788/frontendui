import { EventLargeCard } from "../Components"
import { EventPageNavbar } from "./EventPageNavbar"

/**
 * Renders a page layout for a single event entity, including navigation and detailed view.
 *
 * This component wraps `EventPageNavbar` and `EventLargeCard` to provide a consistent
 * interface for displaying an individual event. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.event - The event entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a event.
 *
 * @example
 * const event = { id: 1, name: "Example Event" };
 * <EventPageContent event={event}>
 *   <p>Additional info here.</p>
 * </EventPageContent>
 */
export const EventPageContent = ({event, children, ...props}) => {
    return (<>
        <EventPageNavbar event={event} />
        <EventLargeCard event={event} {...props} >
            Event {JSON.stringify(event)}
            {children}
        </EventLargeCard>
    </>)
}