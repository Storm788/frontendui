import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { LessonTypeCardCapsule } from "./LessonTypeCardCapsule"
import { LessonTypeMediumCard } from "./LessonTypeMediumCard"

/**
 * A large card component for displaying detailed content and layout for an lessontype entity.
 *
 * This component wraps an `LessonTypeCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `LessonTypeMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the LessonTypeLargeCard component.
 * @param {Object} props.lessontype - The object representing the lessontype entity.
 * @param {string|number} props.lessontype.id - The unique identifier for the lessontype entity.
 * @param {string} props.lessontype.name - The name or label of the lessontype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const lessontypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <LessonTypeLargeCard lessontype={lessontypeEntity}>
 *   <p>Additional content for the middle column.</p>
 * </LessonTypeLargeCard>
 */
export const LessonTypeLargeCard = ({lessontype, children}) => {
    return (
        <LessonTypeCardCapsule lessontype={lessontype} >
            <Row>
                <LeftColumn>
                    <LessonTypeMediumCard lessontype={lessontype}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </LessonTypeCardCapsule>
    )
}
