/**
 * A component for displaying the `rbacobject` attribute of an topic entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `topic` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the TopicRbacobjectAttribute component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {*} [props.topic.rbacobject] - The rbacobject attribute of the topic entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const topicEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <TopicRbacobjectAttribute topic={topicEntity} />
 */
export const TopicRbacobjectAttribute = ({topic}) => {
    const {rbacobject} = topic
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            {/* <RbacobjectMediumCard rbacobject={rbacobject} /> */}
            {/* <RbacobjectLink rbacobject={rbacobject} /> */}
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}