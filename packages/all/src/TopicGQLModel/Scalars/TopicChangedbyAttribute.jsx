/**
 * A component for displaying the `changedby` attribute of an topic entity.
 *
 * This component checks if the `changedby` attribute exists on the `topic` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the TopicChangedbyAttribute component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {*} [props.topic.changedby] - The changedby attribute of the topic entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const topicEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <TopicChangedbyAttribute topic={topicEntity} />
 */
export const TopicChangedbyAttribute = ({topic}) => {
    const {changedby} = topic
    if (typeof changedby === 'undefined') return null
    return (
        <>
            {/* <ChangedbyMediumCard changedby={changedby} /> */}
            {/* <ChangedbyLink changedby={changedby} /> */}
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}