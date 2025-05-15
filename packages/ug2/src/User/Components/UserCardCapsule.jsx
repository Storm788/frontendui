import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { UserLink } from "./UserLink"

/**
 * A specialized card component that displays an `UserLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `UserLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `user` object.
 *
 * @component
 * @param {Object} props - The props for the UserCardCapsule component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {string|number} props.user.id - The unique identifier for the user entity.
 * @param {string} props.user.name - The display name for the user entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { UserCardCapsule } from './UserCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const userEntity = { id: 123, name: "Example Entity" };
 *
 * <UserCardCapsule user={userEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </UserCardCapsule>
 */
export const UserCardCapsule = ({user, children, title=<><PersonFill /> <UserLink user={user} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
