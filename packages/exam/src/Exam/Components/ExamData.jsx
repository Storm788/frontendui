import { ExamLink } from "."
import { ListGroup, Badge, Row, Col, Button } from "react-bootstrap"
import { ExamButton } from "."
import { PersonFill, Calendar3, Trophy } from "react-bootstrap-icons"

export const ExamList = ({ exams }) => {
    return (
        <ListGroup variant="flush">
            {exams.map(exam => (
                <ListGroup.Item key={exam.id} className="py-3">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h5 className="mb-1">
                                <ExamLink exam={exam} />
                            </h5>
                            {exam.description && (
                                <p className="text-muted mb-1 small">
                                    {exam.description}
                                </p>
                            )}
                            <div className="d-flex gap-3 small text-muted">
                                {exam.created && (
                                    <span>
                                        <Calendar3 className="me-1" />
                                        {new Date(exam.created).toLocaleDateString()}
                                    </span>
                                )}
                                {exam.evaluations && (
                                    <span>
                                        <PersonFill className="me-1" />
                                        {exam.evaluations.length} studentů
                                    </span>
                                )}
                                {(exam.maxScore || exam.minScore) && (
                                    <span>
                                        <Trophy className="me-1" />
                                        {exam.minScore && `Min: ${exam.minScore}`}
                                        {exam.maxScore && exam.minScore && " | "}
                                        {exam.maxScore && `Max: ${exam.maxScore}`}
                                    </span>
                                )}
                            </div>
                        </Col>
                        <Col md={6} className="text-md-end mt-3 mt-md-0">
                            <ExamButton 
                                exam={exam} 
                                operation="U" 
                                className="btn btn-outline-primary btn-sm me-2"
                            >
                                Upravit
                            </ExamButton>
                            <ExamButton 
                                exam={exam} 
                                operation="D" 
                                className="btn btn-outline-danger btn-sm"
                            >
                                Smazat
                            </ExamButton>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}