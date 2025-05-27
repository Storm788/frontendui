import { Col, Row } from "react-bootstrap"
/**
 * A component that displays medium-level content for an role entity.
 *
 * This component renders a label "RoleMediumContent" followed by a serialized representation of the `role` object
 * and any additional child content. It is designed to handle and display information about an role entity object.
 *
 * @component
 * @param {Object} props - The properties for the RoleMediumContent component.
 * @param {Object} props.role - The object representing the role entity.
 * @param {string|number} props.role.id - The unique identifier for the role entity.
 * @param {string} props.role.name - The name or label of the role entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `role` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const roleEntity = { id: 123, name: "Sample Entity" };
 * 
 * <RoleMediumContent role={roleEntity}>
 *   <p>Additional information about the entity.</p>
 * </RoleMediumContent>
 */
export const RoleMediumContent = ({role, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(role, null, 2)}</pre></Col>
            </Row>
            {children}
        </>
    )
}
