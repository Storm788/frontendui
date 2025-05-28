import { ExamLink } from "."
import { ListGroup } from "react-bootstrap"
import { ExamButton } from "."

export const ExamList = ({ exams }) => {

    return (
        <ListGroup>
            {exams.map(exam => (
                <ListGroup.Item key={exam.id}>
                    <ExamLink exam={exam} />
                    <ExamButton exam={exam} operation="U" className="btn btn-success">Update</ExamButton><br />
                    <ExamButton exam={exam} operation="D" className="btn btn-danger">Delete</ExamButton><br />
                </ListGroup.Item>
            ))}
            <ListGroup.Item>
                <ExamButton exam={{}} operation="C" className="btn btn-warning">Insert</ExamButton>
            </ListGroup.Item>
        </ListGroup>
    )
}