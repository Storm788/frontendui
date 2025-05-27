import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ExamLink } from "."
import { ListGroup } from "react-bootstrap"
import { ExamReadPageAsyncAction } from "../Queries/ExamReadPageAsyncAction"


export const ExamDocumentList = ({ }) => {
    const { dispatchResult, loading, error } = useAsyncAction(ExamReadPageAsyncAction, {})


    if (loading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorHandler errors={error} />
    }

    return (
        <ListGroup>
            {dispatchResult.data.result.map(exam => (
                <ListGroup.Item key={exam.id}>
                    <ExamLink exam={exam} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}