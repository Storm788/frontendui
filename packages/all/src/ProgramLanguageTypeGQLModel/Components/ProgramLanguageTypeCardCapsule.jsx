import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ProgramLanguageTypeLink } from "./ProgramLanguageTypeLink"

/**
 * A specialized card component that displays an `ProgramLanguageTypeLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ProgramLanguageTypeLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `programlanguagetype` object.
 *
 * @component
 * @param {Object} props - The props for the ProgramLanguageTypeCardCapsule component.
 * @param {Object} props.programlanguagetype - The object representing the programlanguagetype entity.
 * @param {string|number} props.programlanguagetype.id - The unique identifier for the programlanguagetype entity.
 * @param {string} props.programlanguagetype.name - The display name for the programlanguagetype entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ProgramLanguageTypeCardCapsule } from './ProgramLanguageTypeCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const programlanguagetypeEntity = { id: 123, name: "Example Entity" };
 *
 * <ProgramLanguageTypeCardCapsule programlanguagetype={programlanguagetypeEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ProgramLanguageTypeCardCapsule>
 */
export const ProgramLanguageTypeCardCapsule = ({programlanguagetype, children, title=<><PersonFill /> <ProgramLanguageTypeLink programlanguagetype={programlanguagetype} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
