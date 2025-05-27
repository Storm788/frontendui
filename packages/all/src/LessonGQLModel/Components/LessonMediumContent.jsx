import { Col, Row } from "react-bootstrap"
/**
 * A component that displays medium-level content for an lesson entity.
 *
 * This component renders a label "LessonMediumContent" followed by a serialized representation of the `lesson` object
 * and any additional child content. It is designed to handle and display information about an lesson entity object.
 *
 * @component
 * @param {Object} props - The properties for the LessonMediumContent component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {string|number} props.lesson.id - The unique identifier for the lesson entity.
 * @param {string} props.lesson.name - The name or label of the lesson entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `lesson` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <LessonMediumContent lesson={lessonEntity}>
 *   <p>Additional information about the entity.</p>
 * </LessonMediumContent>
 */
export const LessonMediumContent = ({lesson, children}) => {
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col><ProgramLink program={student?.program} /></Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(lesson, null, 2)}</pre></Col>
            </Row>
            {children}
        </>
    )
}
