import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { EvaluationLink } from "."
import { ListGroup } from "react-bootstrap"
import { EvaluationReadPageAsyncAction } from "../Queries/EvaluationReadPageAsyncAction"


export const EvaluationDocumentList = ({ }) => {
    const { dispatchResult, loading, error } = useAsyncAction(EvaluationReadPageAsyncAction, {})


    if (loading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorHandler errors={error} />
    }

    return (
        <ListGroup>
            {dispatchResult.data.result.map(evaluation => (
                <ListGroup.Item key={evaluation.id}>
                    <EvaluationLink evaluation={evaluation} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
