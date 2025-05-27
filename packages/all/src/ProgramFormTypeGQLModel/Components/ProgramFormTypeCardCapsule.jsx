import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ProgramFormTypeLink } from "./ProgramFormTypeLink"

/**
 * A specialized card component that displays an `ProgramFormTypeLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ProgramFormTypeLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `programformtype` object.
 *
 * @component
 * @param {Object} props - The props for the ProgramFormTypeCardCapsule component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {string|number} props.programformtype.id - The unique identifier for the programformtype entity.
 * @param {string} props.programformtype.name - The display name for the programformtype entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ProgramFormTypeCardCapsule } from './ProgramFormTypeCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const programformtypeEntity = { id: 123, name: "Example Entity" };
 *
 * <ProgramFormTypeCardCapsule programformtype={programformtypeEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ProgramFormTypeCardCapsule>
 */
export const ProgramFormTypeCardCapsule = ({programformtype, children, title=<><PersonFill /> <ProgramFormTypeLink programformtype={programformtype} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
