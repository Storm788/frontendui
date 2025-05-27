import { PersonFill } from "react-bootstrap-icons"
import { ProgramFormTypeLink } from "./ProgramFormTypeLink"
import { ProgramFormTypeCardCapsule } from "./ProgramFormTypeCardCapsule"
import { ProgramFormTypeMediumContent } from "./ProgramFormTypeMediumContent"

/**
 * A card component that displays detailed content for an programformtype entity.
 *
 * This component combines `ProgramFormTypeCardCapsule` and `ProgramFormTypeMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the programformtype entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ProgramFormTypeMediumCard component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {string|number} props.programformtype.id - The unique identifier for the programformtype entity.
 * @param {string} props.programformtype.name - The name or label of the programformtype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramFormTypeMediumCard programformtype={programformtypeEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ProgramFormTypeMediumCard>
 */
export const ProgramFormTypeMediumCard = ({programformtype, children}) => {
    return (
        <ProgramFormTypeCardCapsule title={<><PersonFill /> <ProgramFormTypeLink programformtype={programformtype} /></>}>
            <ProgramFormTypeMediumContent programformtype={programformtype}>
                {children}
            </ProgramFormTypeMediumContent>
        </ProgramFormTypeCardCapsule>
    )
}
