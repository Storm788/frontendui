import { ListGroup, Row, Col, Button, Card, Form, Badge } from "react-bootstrap"
import { StudentEvaluationInsert } from "../../Exam/Components"
import { useState } from "react"
import { EvaluationForm } from "../../Exam/Components/StudentEval";


// Komponenta pro zobrazení existujícího hodnocení
const StudentEvaluationDisplay = ({ evaluation }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <Badge bg={evaluation.passed ? "success" : "danger"}>
        {evaluation.points} bodů
      </Badge>
      <small className="text-muted">
        {evaluation.passed ? "Prošel" : "Neprošel"}
      </small>
    </div>
  );
};

/**
 * Komponenta zobrazující seznam studentů s jejich základními údaji a ovládacími prvky
 * @param {Object[]} students - Pole studentů
 * @param {Number} minScore - Minimální skóre pro úspěch (např. 80)
 * @param {Number} maxScore - Maximální možné skóre (např. 99) 
 * @param {Function} onStudentAdded - Callback when a student is added
 * @param {Function} onStudentEvaluated - Callback when a student is evaluated
 */
export const StudentList = ({ students, minScore = 50, maxScore = 100, exam, programId, onStudentAdded, onStudentEvaluated }) => {
    const [evaluatingStudent, setEvaluatingStudent] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Otevření formuláře pro hodnocení
    const handleEvaluateStudent = (student) => {
        setEvaluatingStudent(student);
    };

    // Zrušení hodnocení
    const handleCancelEvaluation = () => {
        setEvaluatingStudent(null);
    };

    // Odeslání hodnocení
    const handleSubmitEvaluation = async (student, evaluationData) => {
        setSubmitting(true);
        
        try {
            
            // Přidání hodnocení k studentovi (pro lokální zobrazení)
            student.evaluation = evaluationData;
            
            // Zavolání callback funkce
            if (onStudentEvaluated) {
                onStudentEvaluated(student, evaluationData);
            }
            
            setEvaluatingStudent(null);
        } catch (err) {
            console.error("Chyba při ukládání hodnocení:", err);
            alert("Chyba při ukládání hodnocení.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Záhlaví seznamu s nadpisem a tlačítkem pro přidání */}
            <Row className="mx-0 mb-3 p-3 border-bottom">
                <Col>
                    {/* Nadpis seznamu */}
                    <h5 className="mb-0">Seznam studentů</h5>
                    <small className="text-muted">
                        Hodnocení: {minScore}-{maxScore} bodů (minimum pro úspěch: {minScore})
                    </small>
                </Col>
                <Col className="text-end">
                    {/* Komponenta pro přidání existujícího studenta do zkoušky */}
                    <StudentEvaluationInsert examId={exam.id} programId={programId} onDone={onStudentAdded}></StudentEvaluationInsert>
                </Col>
            </Row>

            {/* Seznam studentů bez ohraničení pro lepší vzhled v kartě */}
            <ListGroup variant="flush">
                {students && students.length > 0 ? (
                    students.map(student => {
                        return (
                            <div key={student.id}>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    {/* Informace o studentovi */}
                                    <div>
                                        {/* Jméno a semestr studenta */}
                                        <div>
                                            <strong>{student.student.student.name} {student.student.student.surname}</strong>
                                            <small className="text-muted ms-2">
                                                {student.student.semesterNumber && (
                                                    <span>(Semestr: {student.student.student.semesterNumber})</span>
                                                )}
                                            </small>
                                        </div>
                                    </div>
                                    
                                    {/* Hodnocení nebo tlačítko pro hodnocení */}
                                    <div>
                                            <StudentEvaluationDisplay evaluation={student} />
                                    </div>
                                </ListGroup.Item>
                                
                                {/* Formulář pro hodnocení (zobrazí se pouze pro vybraného studenta) */}
                                {evaluatingStudent?.id === student.id && (
                                    <EvaluationForm
                                        student={student}
                                        minScore={minScore}
                                        maxScore={maxScore}
                                        onSubmit={handleSubmitEvaluation}
                                        onCancel={handleCancelEvaluation}
                                        submitting={submitting}
                                    />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <ListGroup.Item className="text-center text-muted">
                        Žádní studenti nebyli nalezeni
                    </ListGroup.Item>
                )}
            </ListGroup>
        </>
    )
}