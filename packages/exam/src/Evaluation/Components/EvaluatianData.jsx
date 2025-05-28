import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { EvaluationLink } from "."
import { ListGroup } from "react-bootstrap"
import { EvaluationReadPageAsyncAction } from "../Queries/EvaluationReadPageAsyncAction"


export const EvaluationList = ({ evaluations }) => {
    return (
        <ListGroup>
            {evaluations.map(evaluation => (
                <ListGroup.Item key={evaluation.id}>
                    <EvaluationLink evaluation={evaluation} />
                    {/* <StudentButton student={student} operation="U" className="btn btn-success">Update</StudentButton><br />*/}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
