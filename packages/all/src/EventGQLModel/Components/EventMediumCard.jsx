import { PersonFill } from "react-bootstrap-icons"
import { EventLink } from "./EventLink"
import { EventCardCapsule } from "./EventCardCapsule"
import { EventMediumContent } from "./EventMediumContent"

/**
 * A card component that displays detailed content for an event entity.
 *
 * This component combines `EventCardCapsule` and `EventMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the event entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the EventMediumCard component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {string|number} props.event.id - The unique identifier for the event entity.
 * @param {string} props.event.name - The name or label of the event entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const eventEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EventMediumCard event={eventEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </EventMediumCard>
 */
export const EventMediumCard = ({event, children}) => {
    return (
        <EventCardCapsule title={<><PersonFill /> <EventLink event={event} /></>}>
            <EventMediumContent event={event}>
                {children}
            </EventMediumContent>
        </EventCardCapsule>
    )
}
