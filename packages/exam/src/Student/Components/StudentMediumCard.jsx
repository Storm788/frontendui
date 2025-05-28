import { PersonFill } from "react-bootstrap-icons"
import { StudentLink } from "./StudentLink"
import { StudentCardCapsule } from "./StudentCardCapsule"
import { StudentMediumContent } from "./StudentMediumContent"

/**
 * A card component that displays detailed content for an student entity.
 *
 * This component combines `StudentCardCapsule` and `StudentMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the student entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StudentMediumCard component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name or label of the student entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const studentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentMediumCard student={studentEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StudentMediumCard>
 */
export const StudentMediumCard = ({student, children}) => {
    return (
        <StudentCardCapsule title={<><PersonFill /> <StudentLink student={student} /></>}>
            <StudentMediumContent student={student}>
                {children}
            </StudentMediumContent>
        </StudentCardCapsule>
    )
}
