import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { FileEarmarkSpreadsheet, PersonFill } from "react-bootstrap-icons"
import { SemesterLink } from "./SemesterLink"

/**
 * A specialized card component that displays an `SemesterLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `SemesterLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `semester` object.
 *
 * @component
 * @param {Object} props - The props for the SemesterCardCapsule component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {string|number} props.semester.id - The unique identifier for the semester entity.
 * @param {string} props.semester.name - The display name for the semester entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { SemesterCardCapsule } from './SemesterCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const semesterEntity = { id: 123, name: "Example Entity" };
 *
 * <SemesterCardCapsule semester={semesterEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </SemesterCardCapsule>
 */
export const SemesterCardCapsule = ({semester, children, title=<><FileEarmarkSpreadsheet /> <SemesterLink semester={semester} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
