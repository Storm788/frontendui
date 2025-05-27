import { PersonFill } from "react-bootstrap-icons"
import { LessonLink } from "./LessonLink"
import { LessonCardCapsule } from "./LessonCardCapsule"
import { LessonMediumContent } from "./LessonMediumContent"

/**
 * A card component that displays detailed content for an lesson entity.
 *
 * This component combines `LessonCardCapsule` and `LessonMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the lesson entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the LessonMediumCard component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {string|number} props.lesson.id - The unique identifier for the lesson entity.
 * @param {string} props.lesson.name - The name or label of the lesson entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <LessonMediumCard lesson={lessonEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </LessonMediumCard>
 */
export const LessonMediumCard = ({lesson, children}) => {
    return (
        <LessonCardCapsule title={<><PersonFill /> <LessonLink lesson={lesson} /></>}>
            <LessonMediumContent lesson={lesson}>
                {children}
            </LessonMediumContent>
        </LessonCardCapsule>
    )
}
