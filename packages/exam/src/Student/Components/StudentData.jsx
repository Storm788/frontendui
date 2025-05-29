import { StudentLink } from "."
import { ListGroup, Button, Row, Col } from "react-bootstrap"
import { StudentButton } from "."
import { PersonPlusFill, PencilSquare, Trash } from "react-bootstrap-icons"

/**
 * Komponenta zobrazující seznam studentů s jejich základními údaji a ovládacími prvky
 * @param {Object[]} students - Pole studentů
 */
export const StudentList = ({ students }) => {
    return (
        <>
            {/* Záhlaví seznamu s nadpisem a tlačítkem pro přidání */}
            <Row className="mx-0 mb-3 p-3 border-bottom">
                <Col>
                    {/* Nadpis seznamu */}
                    <h5 className="mb-0">Seznam studentů</h5>
                </Col>
                <Col className="text-end">
                    {/* Tlačítko pro přidání nového studenta */}
                    <StudentButton 
                        student={{}} 
                        operation="C" 
                        className="btn btn-primary">
                        <PersonPlusFill className="me-2" />
                        Přidat studenta
                    </StudentButton>
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
                            {/* Tlačítka pro úpravu a smazání studenta */}
                            <div>
                                <StudentButton 
                                    student={student} 
                                    operation="U" 
                                    className="btn btn-outline-success btn-sm me-2">
                                    <PencilSquare className="me-1" />
                                    Upravit
                                </StudentButton>
                                <StudentButton 
                                    student={student} 
                                    operation="D" 
                                    className="btn btn-outline-danger btn-sm">
                                    <Trash className="me-1" />
                                    Smazat
                                </StudentButton>
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