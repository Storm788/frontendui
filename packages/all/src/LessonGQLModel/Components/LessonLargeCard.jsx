import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { LessonCardCapsule } from "./LessonCardCapsule"
import { LessonMediumCard } from "./LessonMediumCard"

/**
 * A large card component for displaying detailed content and layout for an lesson entity.
 *
 * This component wraps an `LessonCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `LessonMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the LessonLargeCard component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {string|number} props.lesson.id - The unique identifier for the lesson entity.
 * @param {string} props.lesson.name - The name or label of the lesson entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <LessonLargeCard lesson={lessonEntity}>
 *   <p>Additional content for the middle column.</p>
 * </LessonLargeCard>
 */
export const LessonLargeCard = ({lesson, children}) => {
    return (
        <LessonCardCapsule lesson={lesson} >
            <Row>
                <LeftColumn>
                    <LessonMediumCard lesson={lesson}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </LessonCardCapsule>
    )
}
