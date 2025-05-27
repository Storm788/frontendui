import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { EventLink } from "./EventLink"

/**
 * A specialized card component that displays an `EventLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `EventLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `event` object.
 *
 * @component
 * @param {Object} props - The props for the EventCardCapsule component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {string|number} props.event.id - The unique identifier for the event entity.
 * @param {string} props.event.name - The display name for the event entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { EventCardCapsule } from './EventCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const eventEntity = { id: 123, name: "Example Entity" };
 *
 * <EventCardCapsule event={eventEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </EventCardCapsule>
 */
export const EventCardCapsule = ({event, children, title=<><PersonFill /> <EventLink event={event} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
