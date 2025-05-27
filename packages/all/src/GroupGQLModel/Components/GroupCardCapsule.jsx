import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { GroupLink } from "./GroupLink"

/**
 * A specialized card component that displays an `GroupLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `GroupLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `group` object.
 *
 * @component
 * @param {Object} props - The props for the GroupCardCapsule component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The display name for the group entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { GroupCardCapsule } from './GroupCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const groupEntity = { id: 123, name: "Example Entity" };
 *
 * <GroupCardCapsule group={groupEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </GroupCardCapsule>
 */
export const GroupCardCapsule = ({group, children, title=<><PersonFill /> <GroupLink group={group} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
