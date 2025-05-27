import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { LessonTypeLink } from "./LessonTypeLink"

/**
 * A specialized card component that displays an `LessonTypeLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `LessonTypeLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `lessontype` object.
 *
 * @component
 * @param {Object} props - The props for the LessonTypeCardCapsule component.
 * @param {Object} props.lessontype - The object representing the lessontype entity.
 * @param {string|number} props.lessontype.id - The unique identifier for the lessontype entity.
 * @param {string} props.lessontype.name - The display name for the lessontype entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { LessonTypeCardCapsule } from './LessonTypeCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const lessontypeEntity = { id: 123, name: "Example Entity" };
 *
 * <LessonTypeCardCapsule lessontype={lessontypeEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </LessonTypeCardCapsule>
 */
export const LessonTypeCardCapsule = ({lessontype, children, title=<><PersonFill /> <LessonTypeLink lessontype={lessontype} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
