import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StudyPlanLessonLink } from "./StudyPlanLessonLink"

/**
 * A specialized card component that displays an `StudyPlanLessonLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StudyPlanLessonLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `studyplanlesson` object.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonCardCapsule component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the studyplanlesson entity.
 * @param {string} props.studyplanlesson.name - The display name for the studyplanlesson entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StudyPlanLessonCardCapsule } from './StudyPlanLessonCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const studyplanlessonEntity = { id: 123, name: "Example Entity" };
 *
 * <StudyPlanLessonCardCapsule studyplanlesson={studyplanlessonEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StudyPlanLessonCardCapsule>
 */
export const StudyPlanLessonCardCapsule = ({studyplanlesson, children, title=<><PersonFill /> <StudyPlanLessonLink studyplanlesson={studyplanlesson} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
