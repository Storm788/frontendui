import { Paperclip, PersonFill } from "react-bootstrap-icons"
import { SemesterLink } from "./SemesterLink"
import { SemesterCardCapsule } from "./SemesterCardCapsule"
import { SemesterMediumContent } from "./SemesterMediumContent"

/**
 * A card component that displays detailed content for an semester entity.
 *
 * This component combines `SemesterCardCapsule` and `SemesterMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the semester entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the SemesterMediumCard component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {string|number} props.semester.id - The unique identifier for the semester entity.
 * @param {string} props.semester.name - The name or label of the semester entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SemesterMediumCard semester={semesterEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </SemesterMediumCard>
 */
export const SemesterMediumCard = ({semester, children}) => {
    return (
        <SemesterCardCapsule title={<><Paperclip /> <SemesterLink semester={semester} /></>}>
            <SemesterMediumContent semester={semester}>
                {children}
            </SemesterMediumContent>
        </SemesterCardCapsule>
    )
}
