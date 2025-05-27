/**
 * A component for displaying the `topic` attribute of an studyplanlesson entity.
 *
 * This component checks if the `topic` attribute exists on the `studyplanlesson` object. If `topic` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `topic` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonTopicAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {*} [props.studyplanlesson.topic] - The topic attribute of the studyplanlesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `topic` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { topic: { id: 1, name: "Sample Topic" } };
 *
 * <StudyPlanLessonTopicAttribute studyplanlesson={studyplanlessonEntity} />
 */
export const StudyPlanLessonTopicAttribute = ({studyplanlesson}) => {
    const {topic} = studyplanlesson
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