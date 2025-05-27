import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ProgramTitleTypeLink } from "./ProgramTitleTypeLink"

/**
 * A specialized card component that displays an `ProgramTitleTypeLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ProgramTitleTypeLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `programtitletype` object.
 *
 * @component
 * @param {Object} props - The props for the ProgramTitleTypeCardCapsule component.
 * @param {Object} props.programtitletype - The object representing the programtitletype entity.
 * @param {string|number} props.programtitletype.id - The unique identifier for the programtitletype entity.
 * @param {string} props.programtitletype.name - The display name for the programtitletype entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ProgramTitleTypeCardCapsule } from './ProgramTitleTypeCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const programtitletypeEntity = { id: 123, name: "Example Entity" };
 *
 * <ProgramTitleTypeCardCapsule programtitletype={programtitletypeEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ProgramTitleTypeCardCapsule>
 */
export const ProgramTitleTypeCardCapsule = ({programtitletype, children, title=<><PersonFill /> <ProgramTitleTypeLink programtitletype={programtitletype} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
