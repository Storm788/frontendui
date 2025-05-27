import { PersonFill } from "react-bootstrap-icons"
import { ProgramLanguageTypeLink } from "./ProgramLanguageTypeLink"
import { ProgramLanguageTypeCardCapsule } from "./ProgramLanguageTypeCardCapsule"
import { ProgramLanguageTypeMediumContent } from "./ProgramLanguageTypeMediumContent"

/**
 * A card component that displays detailed content for an programlanguagetype entity.
 *
 * This component combines `ProgramLanguageTypeCardCapsule` and `ProgramLanguageTypeMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the programlanguagetype entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ProgramLanguageTypeMediumCard component.
 * @param {Object} props.programlanguagetype - The object representing the programlanguagetype entity.
 * @param {string|number} props.programlanguagetype.id - The unique identifier for the programlanguagetype entity.
 * @param {string} props.programlanguagetype.name - The name or label of the programlanguagetype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const programlanguagetypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramLanguageTypeMediumCard programlanguagetype={programlanguagetypeEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ProgramLanguageTypeMediumCard>
 */
export const ProgramLanguageTypeMediumCard = ({programlanguagetype, children}) => {
    return (
        <ProgramLanguageTypeCardCapsule title={<><PersonFill /> <ProgramLanguageTypeLink programlanguagetype={programlanguagetype} /></>}>
            <ProgramLanguageTypeMediumContent programlanguagetype={programlanguagetype}>
                {children}
            </ProgramLanguageTypeMediumContent>
        </ProgramLanguageTypeCardCapsule>
    )
}
