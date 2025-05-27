import { PersonFill } from "react-bootstrap-icons"
import { StudyPlanLessonLink } from "./StudyPlanLessonLink"
import { StudyPlanLessonCardCapsule } from "./StudyPlanLessonCardCapsule"
import { StudyPlanLessonMediumContent } from "./StudyPlanLessonMediumContent"

/**
 * A card component that displays detailed content for an studyplanlesson entity.
 *
 * This component combines `StudyPlanLessonCardCapsule` and `StudyPlanLessonMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the studyplanlesson entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StudyPlanLessonMediumCard component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the studyplanlesson entity.
 * @param {string} props.studyplanlesson.name - The name or label of the studyplanlesson entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyPlanLessonMediumCard studyplanlesson={studyplanlessonEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StudyPlanLessonMediumCard>
 */
export const StudyPlanLessonMediumCard = ({studyplanlesson, children}) => {
    return (
        <StudyPlanLessonCardCapsule title={<><PersonFill /> <StudyPlanLessonLink studyplanlesson={studyplanlesson} /></>}>
            <StudyPlanLessonMediumContent studyplanlesson={studyplanlesson}>
                {children}
            </StudyPlanLessonMediumContent>
        </StudyPlanLessonCardCapsule>
    )
}
