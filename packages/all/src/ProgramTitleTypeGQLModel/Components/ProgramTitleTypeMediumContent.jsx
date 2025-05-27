import { Col, Row } from "react-bootstrap"
/**
 * A component that displays medium-level content for an programtitletype entity.
 *
 * This component renders a label "ProgramTitleTypeMediumContent" followed by a serialized representation of the `programtitletype` object
 * and any additional child content. It is designed to handle and display information about an programtitletype entity object.
 *
 * @component
 * @param {Object} props - The properties for the ProgramTitleTypeMediumContent component.
 * @param {Object} props.programtitletype - The object representing the programtitletype entity.
 * @param {string|number} props.programtitletype.id - The unique identifier for the programtitletype entity.
 * @param {string} props.programtitletype.name - The name or label of the programtitletype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `programtitletype` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const programtitletypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramTitleTypeMediumContent programtitletype={programtitletypeEntity}>
 *   <p>Additional information about the entity.</p>
 * </ProgramTitleTypeMediumContent>
 */
export const ProgramTitleTypeMediumContent = ({programtitletype, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(programtitletype, null, 2)}</pre></Col>
            </Row>
            {children}
        </>
    )
}
