import { PersonFill } from "react-bootstrap-icons"
import { ProgramTypeLink } from "./ProgramTypeLink"
import { ProgramTypeCardCapsule } from "./ProgramTypeCardCapsule"
import { ProgramTypeMediumContent } from "./ProgramTypeMediumContent"

/**
 * A card component that displays detailed content for an programtype entity.
 *
 * This component combines `ProgramTypeCardCapsule` and `ProgramTypeMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the programtype entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ProgramTypeMediumCard component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {string|number} props.programtype.id - The unique identifier for the programtype entity.
 * @param {string} props.programtype.name - The name or label of the programtype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramTypeMediumCard programtype={programtypeEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ProgramTypeMediumCard>
 */
export const ProgramTypeMediumCard = ({programtype, children}) => {
    return (
        <ProgramTypeCardCapsule title={<><PersonFill /> <ProgramTypeLink programtype={programtype} /></>}>
            <ProgramTypeMediumContent programtype={programtype}>
                {children}
            </ProgramTypeMediumContent>
        </ProgramTypeCardCapsule>
    )
}
