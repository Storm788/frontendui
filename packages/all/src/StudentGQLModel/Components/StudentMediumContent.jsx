import { Col, Row } from "react-bootstrap"
import { ProgramLink } from "../../ProgramGQLModel"
import { UserLink } from "../../UserGQLModel"

/**
 * A component that displays medium-level content for an student entity.
 *
 * This component renders a label "StudentMediumContent" followed by a serialized representation of the `student` object
 * and any additional child content. It is designed to handle and display information about an student entity object.
 *
 * @component
 * @param {Object} props - The properties for the StudentMediumContent component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name or label of the student entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `student` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const studentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentMediumContent student={studentEntity}>
 *   <p>Additional information about the entity.</p>
 * </StudentMediumContent>
 */
export const StudentMediumContent = ({student, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>Osoba</Col>
                <Col>{student?.student && <UserLink user={student?.student} />}</Col>
            </Row>
            <Row>
                <Col>Stav</Col>
                <Col>{student?.state?.name || student?.stateId}</Col>
            </Row>
            <Row>
                <Col>Semestr</Col>
                <Col>{student?.semesterNumber || "?"}</Col>
            </Row>
            {/* $StudentMediumContent$ <br />
            {JSON.stringify(student)}
            $StudentMediumContent$ */}
            {children}
        </>
    )
}
