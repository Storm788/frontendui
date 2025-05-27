/**
 * A component for displaying the `topic` attribute of an lesson entity.
 *
 * This component checks if the `topic` attribute exists on the `lesson` object. If `topic` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `topic` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonTopicAttribute component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {*} [props.lesson.topic] - The topic attribute of the lesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `topic` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { topic: { id: 1, name: "Sample Topic" } };
 *
 * <LessonTopicAttribute lesson={lessonEntity} />
 */
export const LessonTopicAttribute = ({lesson}) => {
    const {topic} = lesson
    if (typeof topic === 'undefined') return null
    return (
        <>
            {/* <TopicMediumCard topic={topic} /> */}
            {/* <TopicLink topic={topic} /> */}
            Probably {'<TopicMediumCard topic=\{topic\} />'} <br />
            <pre>{JSON.stringify(topic, null, 4)}</pre>
        </>
    )
}