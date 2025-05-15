import { PersonFill } from "react-bootstrap-icons"
import { UserLink } from "./UserLink"
import { UserCardCapsule } from "./UserCardCapsule"
import { UserMediumContent } from "./UserMediumContent"

/**
 * A card component that displays detailed content for an user entity.
 *
 * This component combines `UserCardCapsule` and `UserMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the user entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the UserMediumCard component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {string|number} props.user.id - The unique identifier for the user entity.
 * @param {string} props.user.name - The name or label of the user entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 123, name: "Sample Entity" };
 * 
 * <UserMediumCard user={userEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </UserMediumCard>
 */
export const UserMediumCard = ({user, children}) => {
    return (
        <UserCardCapsule title={<><PersonFill /> <UserLink user={user} /></>}>
            <UserMediumContent user={user}>
                {children}
            </UserMediumContent>
        </UserCardCapsule>
    )
}
