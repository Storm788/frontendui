import { StudentLink } from "."
import { ListGroup } from "react-bootstrap"
import { StudentButton } from "."

export const StudentList = ({ students }) => {
    return (
        <ListGroup>
            {students.map(student => (
                <ListGroup.Item key={student.id}>
                    <StudentLink student={student} />
                    <StudentButton student={student} operation="U" className="btn btn-success">Update</StudentButton><br />
                    <StudentButton student={student} operation="D" className="btn btn-danger">Delete</StudentButton><br />
                </ListGroup.Item>
            ))}
             <ListGroup.Item>
                <StudentButton student={{}} operation="C" className="btn btn-warning">Insert</StudentButton>
            </ListGroup.Item>
        </ListGroup>
    )
}