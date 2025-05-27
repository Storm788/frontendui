import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { LessonLink } from "./LessonLink"

/**
 * A specialized card component that displays an `LessonLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `LessonLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `lesson` object.
 *
 * @component
 * @param {Object} props - The props for the LessonCardCapsule component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {string|number} props.lesson.id - The unique identifier for the lesson entity.
 * @param {string} props.lesson.name - The display name for the lesson entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { LessonCardCapsule } from './LessonCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const lessonEntity = { id: 123, name: "Example Entity" };
 *
 * <LessonCardCapsule lesson={lessonEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </LessonCardCapsule>
 */
export const LessonCardCapsule = ({lesson, children, title=<><PersonFill /> <LessonLink lesson={lesson} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
