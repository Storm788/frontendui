import { ListGroup, Row, Col, Button, Card, Form, Badge } from "react-bootstrap"
import { StudentEvaluationInsert } from "../../Exam/Components"
import { useState } from "react"
import { EvaluationInsertAsyncAction } from "../../Evaluation/Queries";
import {useAsyncAction} from "@hrbolek/uoisfrontend-gql-shared";
import { ExamReadAsyncAction } from "../../Exam/Queries";




// Komponenta pro hodnocení studenta
const EvaluationForm = ({ student, minScore, maxScore, onSubmit, submitting }) => {
  const { fetch: fetchEvaluationInsert } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deffered: true });
  const [points, setPoints] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const pointsNumber = parseInt(points) || 0;
    const passed = pointsNumber >= minScore; // Automatický výpočet
    onSubmit(student, { points: pointsNumber, passed });
  };

  const onClick = async (e) => {
    const EvaluationInsertParams = {
      id: crypto.randomUUID(),
      passed: parseInt(points) >= minScore,
      points: parseInt(points),
      studentId : student.id,
      examId: student.examId,
    };
    const evaluationResult = await fetchEvaluationInsert(EvaluationInsertParams);
    console.log(evaluationResult);
  };

  const onCancel = (e) => {
    return;
  }

  // Aktuální preview výsledku
  const currentPoints = parseInt(points) || 0;
  const wouldPass = currentPoints >= minScore;

  return (
    <Card className="mt-2">
      <Card.Header>
        <h6 className="mb-0">Hodnocení: {student.student.name} {student.student.surname}</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Počet bodů</Form.Label>
                <Form.Control
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  min="0"
                  max={maxScore}
                  placeholder={`Zadejte počet bodů (0-${maxScore})`}
                  required
                />
                <Form.Text className="text-muted">
                  Minimum pro úspěch: {minScore} bodů
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Výsledek</Form.Label>
                <div className="p-2 border rounded">
                  {points ? (
                    <Badge bg={wouldPass ? "success" : "danger"} className="fs-6">
                      {wouldPass ? "Prošel" : "Neprošel"}
                    </Badge>
                  ) : (
                    <span className="text-muted">Zadejte body pro náhled</span>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex gap-2">
            <Button 
              type="submit" 
              variant="success"
              onClick={onClick}
              disabled={submitting || !points}
            >
              {submitting ? 'Ukládám...' : 'Uložit hodnocení'}
            </Button>
            <Button 
              variant="secondary"
              onClick={onCancel}
              disabled={submitting}
            >
              Zrušit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

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
export const StudentList = ({ students, minScore = 50, maxScore = 100, examId, programId, onStudentAdded, onStudentEvaluated }) => {
    const { loading, entity, error } = useAsyncAction(ExamReadAsyncAction, { id: examId }, {});
    // Create students array from exam.evaluations
    students = entity?.evaluations
      ? entity.evaluations.map(evaluation => evaluation.student)
      : [];

    console.log("Loaded students:", students);

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

            // Simulace API volání
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Přidání hodnocení k studentovi (pro lokální zobrazení)
            student.evaluation = evaluationData;
            
            alert(`Hodnocení pro ${student.student.name} ${student.student.surname} bylo úspěšně uloženo! (${evaluationData.points} bodů, ${evaluationData.passed ? 'prošel' : 'neprošel'})`);
            
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
                    <StudentEvaluationInsert examId={examId} programId={programId} onDone={onStudentAdded}></StudentEvaluationInsert>
                </Col>
            </Row>

            {/* Seznam studentů bez ohraničení pro lepší vzhled v kartě */}
            <ListGroup variant="flush">
                {students && students.length > 0 ? (
                    students.map(student => {

                        const evaluation = entity?.evaluations?.find(
                          (evaluation) => evaluation.student?.id === student.id
                        );
                        const hasEvaluation = !!evaluation;

                        
                        return (
                            <div key={student.id}>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    {/* Informace o studentovi */}
                                    <div>
                                        {/* Jméno a semestr studenta */}
                                        <div>
                                            <strong>{student.student.name} {student.student.surname}</strong>
                                            <small className="text-muted ms-2">
                                                {student.student.semesterNumber && (
                                                    <span>(Semestr: {student.student.semesterNumber})</span>
                                                )}
                                            </small>
                                        </div>
                                    </div>
                                    
                                    {/* Hodnocení nebo tlačítko pro hodnocení */}
                                    <div>
                                        {hasEvaluation ? (
                                            <StudentEvaluationDisplay evaluation={evaluation} />
                                        ) : (
                                            <Button 
                                                variant="primary" 
                                                size="sm"
                                                onClick={() => handleEvaluateStudent(student)}
                                                disabled={evaluatingStudent?.id === student.id}
                                            >
                                                Hodnotit
                                            </Button>
                                        )}
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