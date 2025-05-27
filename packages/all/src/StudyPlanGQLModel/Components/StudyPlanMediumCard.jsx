import { JournalBookmark, PersonFill } from "react-bootstrap-icons"
import { StudyPlanLink } from "./StudyPlanLink"
import { StudyPlanCardCapsule } from "./StudyPlanCardCapsule"
import { StudyPlanMediumContent } from "./StudyPlanMediumContent"

/**
 * A card component that displays detailed content for an studyplan entity.
 *
 * This component combines `StudyPlanCardCapsule` and `StudyPlanMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the studyplan entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StudyPlanMediumCard component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the studyplan entity.
 * @param {string} props.studyplan.name - The name or label of the studyplan entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyPlanMediumCard studyplan={studyplanEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StudyPlanMediumCard>
 */
export const StudyPlanMediumCard = ({studyplan, children}) => {
    return (
        <StudyPlanCardCapsule title={<><JournalBookmark /> <StudyPlanLink studyplan={studyplan} /></>}>
            <StudyPlanMediumContent studyplan={studyplan}>
                {children}
            </StudyPlanMediumContent>
        </StudyPlanCardCapsule>
    )
}
