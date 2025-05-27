import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { SubjectLink } from "./SubjectLink"

/**
 * A specialized card component that displays an `SubjectLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `SubjectLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `subject` object.
 *
 * @component
 * @param {Object} props - The props for the SubjectCardCapsule component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The display name for the subject entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { SubjectCardCapsule } from './SubjectCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const subjectEntity = { id: 123, name: "Example Entity" };
 *
 * <SubjectCardCapsule subject={subjectEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </SubjectCardCapsule>
 */
export const SubjectCardCapsule = ({subject, children, title=<><PersonFill /> <SubjectLink subject={subject} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
