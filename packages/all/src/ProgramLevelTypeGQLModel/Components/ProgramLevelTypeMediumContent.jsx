import { Col, Row } from "react-bootstrap"
/**
 * A component that displays medium-level content for an programleveltype entity.
 *
 * This component renders a label "ProgramLevelTypeMediumContent" followed by a serialized representation of the `programleveltype` object
 * and any additional child content. It is designed to handle and display information about an programleveltype entity object.
 *
 * @component
 * @param {Object} props - The properties for the ProgramLevelTypeMediumContent component.
 * @param {Object} props.programleveltype - The object representing the programleveltype entity.
 * @param {string|number} props.programleveltype.id - The unique identifier for the programleveltype entity.
 * @param {string} props.programleveltype.name - The name or label of the programleveltype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `programleveltype` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const programleveltypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramLevelTypeMediumContent programleveltype={programleveltypeEntity}>
 *   <p>Additional information about the entity.</p>
 * </ProgramLevelTypeMediumContent>
 */
export const ProgramLevelTypeMediumContent = ({programleveltype, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(programleveltype, null, 2)}</pre></Col>
            </Row>
            {children}
        </>
    )
}
