import { Badge } from "react-bootstrap";
import { EvaluationButton } from "../../Evaluation/Components";

/**
* Komponenta pro zobrazení existujícího hodnocení
* @param {Object[]} students - Pole studentů
* @param {Object} evaluation - Objekt hodnocení studenta
* @param {Function} onDone - Callback po dokončení operace
* @param {boolean} readOnly - Určuje, zda je hodnocení pouze pro čtení
* @param {Object} evaluation - Objekt hodnocení studenta
* @param {string} evaluation.grade - Značka hodnocení (např. "A", "B", "C", "D", "E", "F")
* @param {number} evaluation.points - Počet bodů získaných studentem
* @param {boolean} evaluation.passed - Indikuje, zda student prošel hodnocením
**/
export const StudentEvaluationDisplay = ({ evaluation, onDone, readOnly }) => {
    evaluation.passed = evaluation.points >= 50;
    if (evaluation.points < 50) evaluation.grade = "F";
    else if (evaluation.points < 60) evaluation.grade = "E";
    else if (evaluation.points < 70) evaluation.grade = "D";
    else if (evaluation.points < 80) evaluation.grade = "C";
    else if (evaluation.points < 90) evaluation.grade = "B";
    else evaluation.grade = "A";
    return (
    <div className="d-flex align-items-center gap-2">
        <small className="text-muted">
            {evaluation.passed ? "Prošel" : "Neprošel"}
        </small>
        <small>
            <Badge bg="secondary">{evaluation.grade}</Badge>
        </small>
            <Badge bg={evaluation.passed ? "success" : "danger"}>
                 {evaluation.points} bodů
            </Badge>
        {/* <EvaluationDeleteButton evaluationId={evaluation.id} lastchange={evaluation.lastchange} onDone={onDone}/> */}
        {!readOnly && (
          <>
            <EvaluationButton operation="U" evaluation={evaluation} onDone={onDone} className="btn btn-primary">Upravit</EvaluationButton>
            <EvaluationButton operation="D" evaluation={evaluation} onDone={onDone} className="btn btn-danger">Smazat</EvaluationButton>
          </>
        )}
    </div>
  );
};