import { Col, Row } from "react-bootstrap"
/**
 * A component that displays medium-level content for an event entity.
 *
 * This component renders a label "EventMediumContent" followed by a serialized representation of the `event` object
 * and any additional child content. It is designed to handle and display information about an event entity object.
 *
 * @component
 * @param {Object} props - The properties for the EventMediumContent component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {string|number} props.event.id - The unique identifier for the event entity.
 * @param {string} props.event.name - The name or label of the event entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `event` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const eventEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EventMediumContent event={eventEntity}>
 *   <p>Additional information about the entity.</p>
 * </EventMediumContent>
 */
export const EventMediumContent = ({event, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(event, null, 2)}</pre></Col>
            </Row>
            {children}
        </>
    )
}
