import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StudentLink } from "./StudentLink"

/**
 * A specialized card component that displays an `StudentLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StudentLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `student` object.
 *
 * @component
 * @param {Object} props - The props for the StudentCardCapsule component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The display name for the student entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StudentCardCapsule } from './StudentCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const studentEntity = { id: 123, name: "Example Entity" };
 *
 * <StudentCardCapsule student={studentEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StudentCardCapsule>
 */
export const StudentCardCapsule = ({student, children, title=<><PersonFill /> <StudentLink student={student} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
