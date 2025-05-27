import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { SubjectCardCapsule } from "./SubjectCardCapsule"
import { SubjectMediumCard } from "./SubjectMediumCard"

/**
 * A large card component for displaying detailed content and layout for an subject entity.
 *
 * This component wraps an `SubjectCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `SubjectMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the SubjectLargeCard component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SubjectLargeCard subject={subjectEntity}>
 *   <p>Additional content for the middle column.</p>
 * </SubjectLargeCard>
 */
export const SubjectLargeCard = ({subject, children}) => {
    return (
        <SubjectCardCapsule subject={subject} >
            <Row>
                <LeftColumn>
                    <SubjectMediumCard subject={subject}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </SubjectCardCapsule>
    )
}
