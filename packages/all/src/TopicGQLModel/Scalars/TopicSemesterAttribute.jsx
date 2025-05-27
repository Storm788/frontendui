/**
 * A component for displaying the `semester` attribute of an topic entity.
 *
 * This component checks if the `semester` attribute exists on the `topic` object. If `semester` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `semester` attribute.
 *
 * @component
 * @param {Object} props - The props for the TopicSemesterAttribute component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {*} [props.topic.semester] - The semester attribute of the topic entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `semester` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const topicEntity = { semester: { id: 1, name: "Sample Semester" } };
 *
 * <TopicSemesterAttribute topic={topicEntity} />
 */
export const TopicSemesterAttribute = ({topic}) => {
    const {semester} = topic
    if (typeof semester === 'undefined') return null
    return (
        <>
            {/* <SemesterMediumCard semester={semester} /> */}
            {/* <SemesterLink semester={semester} /> */}
            Probably {'<SemesterMediumCard semester=\{semester\} />'} <br />
            <pre>{JSON.stringify(semester, null, 4)}</pre>
        </>
    )
}