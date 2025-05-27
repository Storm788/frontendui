import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StudyPlanLessonCardCapsule } from "./StudyPlanLessonCardCapsule"
import { StudyPlanLessonMediumCard } from "./StudyPlanLessonMediumCard"

/**
 * A large card component for displaying detailed content and layout for an studyplanlesson entity.
 *
 * This component wraps an `StudyPlanLessonCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StudyPlanLessonMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StudyPlanLessonLargeCard component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the studyplanlesson entity.
 * @param {string} props.studyplanlesson.name - The name or label of the studyplanlesson entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyPlanLessonLargeCard studyplanlesson={studyplanlessonEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StudyPlanLessonLargeCard>
 */
export const StudyPlanLessonLargeCard = ({studyplanlesson, children}) => {
    return (
        <StudyPlanLessonCardCapsule studyplanlesson={studyplanlesson} >
            <Row>
                <LeftColumn>
                    <StudyPlanLessonMediumCard studyplanlesson={studyplanlesson}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StudyPlanLessonCardCapsule>
    )
}
