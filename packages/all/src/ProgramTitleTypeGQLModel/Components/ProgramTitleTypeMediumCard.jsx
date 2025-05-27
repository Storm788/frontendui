import { PersonFill } from "react-bootstrap-icons"
import { ProgramTitleTypeLink } from "./ProgramTitleTypeLink"
import { ProgramTitleTypeCardCapsule } from "./ProgramTitleTypeCardCapsule"
import { ProgramTitleTypeMediumContent } from "./ProgramTitleTypeMediumContent"

/**
 * A card component that displays detailed content for an programtitletype entity.
 *
 * This component combines `ProgramTitleTypeCardCapsule` and `ProgramTitleTypeMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the programtitletype entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ProgramTitleTypeMediumCard component.
 * @param {Object} props.programtitletype - The object representing the programtitletype entity.
 * @param {string|number} props.programtitletype.id - The unique identifier for the programtitletype entity.
 * @param {string} props.programtitletype.name - The name or label of the programtitletype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const programtitletypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramTitleTypeMediumCard programtitletype={programtitletypeEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ProgramTitleTypeMediumCard>
 */
export const ProgramTitleTypeMediumCard = ({programtitletype, children}) => {
    return (
        <ProgramTitleTypeCardCapsule title={<><PersonFill /> <ProgramTitleTypeLink programtitletype={programtitletype} /></>}>
            <ProgramTitleTypeMediumContent programtitletype={programtitletype}>
                {children}
            </ProgramTitleTypeMediumContent>
        </ProgramTitleTypeCardCapsule>
    )
}
