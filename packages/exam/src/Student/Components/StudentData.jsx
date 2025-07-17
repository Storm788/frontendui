import { StudentLink } from "."
import { ListGroup, Row, Col } from "react-bootstrap"
import { StudentEvaluationInsert } from "../../Exam/Components"

/**
 * Komponenta zobrazující seznam studentů s jejich základními údaji a ovládacími prvky
 * @param {Object[]} students - Pole studentů
 * @param {Function} onStudentAdded - Callback when a student is added
 */
export const StudentList = ({ students, examId, programId, onStudentAdded }) => {
    return (
        <>
            {/* Záhlaví seznamu s nadpisem a tlačítkem pro přidání */}
            <Row className="mx-0 mb-3 p-3 border-bottom">
                <Col>
                    {/* Nadpis seznamu */}
                    <h5 className="mb-0">Seznam studentů</h5>
                </Col>
                <Col className="text-end">
                    {/* Komponenta pro přidání existujícího studenta do zkoušky */}
                    <StudentEvaluationInsert examId={examId} programId={programId} onDone={onStudentAdded}></StudentEvaluationInsert>
                </Col>
            </Row>

            {/* Seznam studentů bez ohraničení pro lepší vzhled v kartě */}
            <ListGroup variant="flush">
                {students && students.length > 0 ? (
                    students.map(student => (
                        <ListGroup.Item key={student.id} className="d-flex justify-content-between align-items-center">
                            {/* Informace o studentovi */}
                            <div>
                                {/* Jméno a semestr studenta */}
                                <div>
                                    <StudentLink student={student} />
                                    <small className="text-muted ms-2">
                                        {student.student.name} {student.student.surname}
                                        {student.student.semesterNumber && (
                                            <span className="ms-2">(Semestr: {student.student.semesterNumber})</span>
                                        )}
                                    </small>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="text-center text-muted">
                        Žádní studenti nebyli nalezeni
                    </ListGroup.Item>
                )}
            </ListGroup>
        </>
    )
}