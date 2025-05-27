import { PersonFill } from "react-bootstrap-icons"
import { GroupLink } from "./GroupLink"
import { GroupCardCapsule } from "./GroupCardCapsule"
import { GroupMediumContent } from "./GroupMediumContent"

/**
 * A card component that displays detailed content for an group entity.
 *
 * This component combines `GroupCardCapsule` and `GroupMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the group entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the GroupMediumCard component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The name or label of the group entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const groupEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GroupMediumCard group={groupEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </GroupMediumCard>
 */
export const GroupMediumCard = ({group, children}) => {
    return (
        <GroupCardCapsule title={<><PersonFill /> <GroupLink group={group} /></>}>
            <GroupMediumContent group={group}>
                {children}
            </GroupMediumContent>
        </GroupCardCapsule>
    )
}
