import { PersonFill } from "react-bootstrap-icons"
import { LessonTypeLink } from "./LessonTypeLink"
import { LessonTypeCardCapsule } from "./LessonTypeCardCapsule"
import { LessonTypeMediumContent } from "./LessonTypeMediumContent"

/**
 * A card component that displays detailed content for an lessontype entity.
 *
 * This component combines `LessonTypeCardCapsule` and `LessonTypeMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the lessontype entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the LessonTypeMediumCard component.
 * @param {Object} props.lessontype - The object representing the lessontype entity.
 * @param {string|number} props.lessontype.id - The unique identifier for the lessontype entity.
 * @param {string} props.lessontype.name - The name or label of the lessontype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const lessontypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <LessonTypeMediumCard lessontype={lessontypeEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </LessonTypeMediumCard>
 */
export const LessonTypeMediumCard = ({lessontype, children}) => {
    return (
        <LessonTypeCardCapsule title={<><PersonFill /> <LessonTypeLink lessontype={lessontype} /></>}>
            <LessonTypeMediumContent lessontype={lessontype}>
                {children}
            </LessonTypeMediumContent>
        </LessonTypeCardCapsule>
    )
}
