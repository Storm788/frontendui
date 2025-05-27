import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { EventCardCapsule } from "./EventCardCapsule"
import { EventMediumCard } from "./EventMediumCard"

/**
 * A large card component for displaying detailed content and layout for an event entity.
 *
 * This component wraps an `EventCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `EventMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the EventLargeCard component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {string|number} props.event.id - The unique identifier for the event entity.
 * @param {string} props.event.name - The name or label of the event entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const eventEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EventLargeCard event={eventEntity}>
 *   <p>Additional content for the middle column.</p>
 * </EventLargeCard>
 */
export const EventLargeCard = ({event, children}) => {
    return (
        <EventCardCapsule event={event} >
            <Row>
                <LeftColumn>
                    <EventMediumCard event={event}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </EventCardCapsule>
    )
}
