import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ProgramLevelTypeLink } from "./ProgramLevelTypeLink"

/**
 * A specialized card component that displays an `ProgramLevelTypeLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ProgramLevelTypeLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `programleveltype` object.
 *
 * @component
 * @param {Object} props - The props for the ProgramLevelTypeCardCapsule component.
 * @param {Object} props.programleveltype - The object representing the programleveltype entity.
 * @param {string|number} props.programleveltype.id - The unique identifier for the programleveltype entity.
 * @param {string} props.programleveltype.name - The display name for the programleveltype entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ProgramLevelTypeCardCapsule } from './ProgramLevelTypeCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const programleveltypeEntity = { id: 123, name: "Example Entity" };
 *
 * <ProgramLevelTypeCardCapsule programleveltype={programleveltypeEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ProgramLevelTypeCardCapsule>
 */
export const ProgramLevelTypeCardCapsule = ({programleveltype, children, title=<><PersonFill /> <ProgramLevelTypeLink programleveltype={programleveltype} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
