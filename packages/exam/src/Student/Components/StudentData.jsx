import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudentLink } from "."
import { ListGroup } from "react-bootstrap"
import { StudentReadPageAsyncAction } from "../Queries/StudentReadPageAsyncAction"


export const StudentDocumentList = ({ }) => {
    const { dispatchResult, loading, error } = useAsyncAction(StudentReadPageAsyncAction, {})


    if (loading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorHandler errors={error} />
    }

    return (
        <ListGroup>
            {dispatchResult.data.result.map(student => (
                <ListGroup.Item key={student.id}>
                    <StudentLink student={student} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}