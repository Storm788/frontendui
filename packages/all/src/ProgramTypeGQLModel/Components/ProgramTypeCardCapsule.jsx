import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ProgramTypeLink } from "./ProgramTypeLink"

/**
 * A specialized card component that displays an `ProgramTypeLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ProgramTypeLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `programtype` object.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeCardCapsule component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {string|number} props.programtype.id - The unique identifier for the programtype entity.
 * @param {string} props.programtype.name - The display name for the programtype entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ProgramTypeCardCapsule } from './ProgramTypeCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const programtypeEntity = { id: 123, name: "Example Entity" };
 *
 * <ProgramTypeCardCapsule programtype={programtypeEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ProgramTypeCardCapsule>
 */
export const ProgramTypeCardCapsule = ({programtype, children, title=<><PersonFill /> <ProgramTypeLink programtype={programtype} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
