import { ExamLink } from "."
import { ListGroup } from "react-bootstrap"


export const ExamList = ({ exams }) => {

    return (
        <ListGroup>
            {exams.map(exam => (
                <ListGroup.Item key={exam.id}>
                    <ExamLink exam={exam} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}