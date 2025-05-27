import { Col, Row } from "react-bootstrap"
/**
 * A component that displays medium-level content for an statemachine entity.
 *
 * This component renders a label "StateMachineMediumContent" followed by a serialized representation of the `statemachine` object
 * and any additional child content. It is designed to handle and display information about an statemachine entity object.
 *
 * @component
 * @param {Object} props - The properties for the StateMachineMediumContent component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {string|number} props.statemachine.id - The unique identifier for the statemachine entity.
 * @param {string} props.statemachine.name - The name or label of the statemachine entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `statemachine` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateMachineMediumContent statemachine={statemachineEntity}>
 *   <p>Additional information about the entity.</p>
 * </StateMachineMediumContent>
 */
export const StateMachineMediumContent = ({statemachine, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(statemachine, null, 2)}</pre></Col>
            </Row>
            {children}
        </>
    )
}
