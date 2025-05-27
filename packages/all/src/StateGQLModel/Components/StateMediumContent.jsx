import { Col, Row } from "react-bootstrap"
/**
 * A component that displays medium-level content for an state entity.
 *
 * This component renders a label "StateMediumContent" followed by a serialized representation of the `state` object
 * and any additional child content. It is designed to handle and display information about an state entity object.
 *
 * @component
 * @param {Object} props - The properties for the StateMediumContent component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {string|number} props.state.id - The unique identifier for the state entity.
 * @param {string} props.state.name - The name or label of the state entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `state` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const stateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateMediumContent state={stateEntity}>
 *   <p>Additional information about the entity.</p>
 * </StateMediumContent>
 */
export const StateMediumContent = ({state, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(state, null, 2)}</pre></Col>
            </Row>
            {children}
        </>
    )
}
