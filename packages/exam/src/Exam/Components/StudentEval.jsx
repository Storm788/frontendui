import { Row, Col, Button, Card, Form, Badge } from "react-bootstrap"
import { useState } from "react"
import { EvaluationInsertAsyncAction } from "../../Evaluation/Queries";
import {useAsyncAction} from "@hrbolek/uoisfrontend-gql-shared";


/**
 * Komponenta formuláře pro hodnocení studenta.
 *
 * @component
 * @param {Object} props - Vlastnosti komponenty.
 * @param {Object} props.student - Objekt studenta, který je hodnocen.
 * @param {number} props.minScore - Minimální počet bodů pro úspěšné hodnocení.
 * @param {number} props.maxScore - Maximální možný počet bodů.
 * @param {boolean} props.submitting - Indikátor, zda je hodnocení právě ukládáno.
 * @param {string} props.examId - ID zkoušky, ke které se hodnocení vztahuje.
 * @param {function} props.onDone - Callback funkce volaná po dokončení uložení hodnocení.
 *
 * @returns {JSX.Element} Formulář pro zadání a uložení hodnocení studenta.
 */
export const EvaluationForm = ({ student, minScore, maxScore, submitting, examId, onDone }) => {
  const { fetch: fetchEvaluationInsert } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deffered: true });
  const [points, setPoints] = useState("");


  const onClick = async (e) => {
    const EvaluationInsertParams = {
      id: crypto.randomUUID(),
      passed: parseInt(points) >= minScore,
      points: parseInt(points),
      studentId : student.id,
      examId: examId,
    };
    const evaluationResult = await fetchEvaluationInsert(EvaluationInsertParams);
    onDone(evaluationResult);
  };

  // Aktuální preview výsledku
  const currentPoints = parseInt(points) || 0;
  const wouldPass = currentPoints >= minScore;

  return (
    <Card className="mt-2">
      <Card.Header>
        <h6 className="mb-0">Hodnocení: {student.student.name} {student.student.surname}</h6>
      </Card.Header>
      <Card.Body>
        <Form>
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
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};