import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { EvaluationLink } from "."
import { ListGroup } from "react-bootstrap"
import { EvaluationReadPageAsyncAction } from "../Queries/EvaluationReadPageAsyncAction"
import { EvaluationButton } from "."

export const EvaluationList = ({ evaluations }) => {
    return (
        <ListGroup>
            {evaluations.map(evaluation => (
                <ListGroup.Item key={evaluation.id}>
                    <EvaluationLink evaluation={evaluation} />
                    <EvaluationButton evaluation={evaluation} operation="U" className="btn btn-success">Update</EvaluationButton><br />
                </ListGroup.Item>
            ))}
            <ListGroup.Item>
                <EvaluationButton evaluation={{}} operation="C" className="btn btn-warning" onDone={(data)=>console.log(data)}>Insert</EvaluationButton> <br />
            </ListGroup.Item>
        </ListGroup>
    )
}
