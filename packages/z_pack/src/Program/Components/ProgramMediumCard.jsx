import { PersonFill } from "react-bootstrap-icons"
import { ProgramLink } from "./ProgramLink"
import { ProgramCardCapsule } from "./ProgramCardCapsule"
import { ProgramMediumContent } from "./ProgramMediumContent"

/**
 * A card component that displays detailed content for an program entity.
 *
 * This component combines `ProgramCardCapsule` and `ProgramMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the program entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ProgramMediumCard component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {string|number} props.program.id - The unique identifier for the program entity.
 * @param {string} props.program.name - The name or label of the program entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const programEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramMediumCard program={programEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ProgramMediumCard>
 */
export const ProgramMediumCard = ({program, children}) => {
    return (
        <ProgramCardCapsule title={<><PersonFill /> <ProgramLink program={program} /></>}>
            <ProgramMediumContent program={program}>
                {children}
            </ProgramMediumContent>
        </ProgramCardCapsule>
    )
}
