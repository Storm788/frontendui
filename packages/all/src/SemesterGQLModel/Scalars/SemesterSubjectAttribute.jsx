import { Col, Row } from "react-bootstrap"
import { SubjectLink, SubjectMediumCard } from "../../SubjectGQLModel"

/**
 * A component for displaying the `subject` attribute of an semester entity.
 *
 * This component checks if the `subject` attribute exists on the `semester` object. If `subject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `subject` attribute.
 *
 * @component
 * @param {Object} props - The props for the SemesterSubjectAttribute component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {*} [props.semester.subject] - The subject attribute of the semester entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `subject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { subject: { id: 1, name: "Sample Subject" } };
 *
 * <SemesterSubjectAttribute semester={semesterEntity} />
 */
export const SemesterSubjectAttribute = ({semester}) => {
    const {subject} = semester
    if (typeof subject === 'undefined') return null
    return (
        <>
            {/* <SubjectMediumCard subject={subject} /> */}
            <Row>
                <Col>Předmět</Col>
                <Col>
                    <SubjectLink subject={subject} />
                </Col>
            </Row>
            
            {/* Probably {'<SubjectMediumCard subject=\{subject\} />'} <br />
            <pre>{JSON.stringify(subject, null, 4)}</pre> */}
        </>
    )
}