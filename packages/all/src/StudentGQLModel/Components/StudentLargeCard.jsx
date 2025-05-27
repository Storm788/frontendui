import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StudentCardCapsule } from "./StudentCardCapsule"
import { StudentMediumCard } from "./StudentMediumCard"

/**
 * A large card component for displaying detailed content and layout for an student entity.
 *
 * This component wraps an `StudentCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StudentMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StudentLargeCard component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name or label of the student entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const studentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentLargeCard student={studentEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StudentLargeCard>
 */
export const StudentLargeCard = ({student, children}) => {
    return (
        <StudentCardCapsule student={student} >
            <Row>
                <LeftColumn>
                    <StudentMediumCard student={student}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StudentCardCapsule>
    )
}
