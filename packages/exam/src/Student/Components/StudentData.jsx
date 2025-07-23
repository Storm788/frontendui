import { ListGroup, Row, Col, Badge } from "react-bootstrap"
import { useState } from "react"
import { EvaluationForm, StudentEvaluationDisplay, StudentEvaluationInsert  } from "@storm788/pckg"

/**
 * Komponenta zobrazující seznam studentů s jejich základními údaji a ovládacími prvky
 * @param {Object[]} evaluations - Pole studentů
 * @param {Number} minScore - Minimální skóre pro úspěch (např. 80)
 * @param {Number} maxScore - Maximální možné skóre (např. 99) 
 * @param {Function} onStudentAdded - Callback when a student is added
 * @param {Function} onStudentEvaluated - Callback when a student is evaluated
 */
export const StudentList = ({ evaluations, minScore = 50, maxScore = 100, exam, programId, onStudentAdded, onStudentEvaluated, readOnly }) => {
    const [evaluatingStudent, setEvaluatingStudent] = useState(null);
    const [submitting, setSubmitting] = useState(false);

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
                    <StudentEvaluationInsert examId={exam.id} programId={programId} onDone={onStudentAdded} readOnly={readOnly} evaluations={evaluations}></StudentEvaluationInsert>
                </Col>
            </Row>

            {/* Seznam studentů bez ohraničení pro lepší vzhled v kartě */}
            <ListGroup variant="flush">
                {evaluations && evaluations.length > 0 ? (
                    evaluations.map(evaluation => {
                        return (
                            <div key={evaluation.id}>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    {/* Informace o studentovi */}
                                    <div>
                                        {/* Jméno a semestr studenta */}
                                        <div>
                                            <strong>{evaluation.student.student.surname} {evaluation.student.student.name} </strong>
                                          
                                        </div>
                                    </div>
                                    
                                    {/* Hodnocení nebo tlačítko pro hodnocení */}
                                    <div>
                                            <StudentEvaluationDisplay evaluation={evaluation} onDone={onStudentAdded} readOnly={readOnly}/>
                                    </div>
                                </ListGroup.Item>
                                
                                {/* Formulář pro hodnocení (zobrazí se pouze pro vybraného studenta) */}
                                {evaluatingStudent?.id === evaluation.id && (
                                    <EvaluationForm
                                        evaluation={evaluation}
                                        minScore={minScore}
                                        maxScore={maxScore}
                                        onSubmit={handleSubmitEvaluation}
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