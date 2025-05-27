/**
 * A component for displaying the `createdby` attribute of an topic entity.
 *
 * This component checks if the `createdby` attribute exists on the `topic` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the TopicCreatedbyAttribute component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {*} [props.topic.createdby] - The createdby attribute of the topic entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const topicEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <TopicCreatedbyAttribute topic={topicEntity} />
 */
export const TopicCreatedbyAttribute = ({topic}) => {
    const {createdby} = topic
    if (typeof createdby === 'undefined') return null
    return (
        <>
            {/* <CreatedbyMediumCard createdby={createdby} /> */}
            {/* <CreatedbyLink createdby={createdby} /> */}
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}