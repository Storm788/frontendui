/**
 * A component for displaying the `rbacobject` attribute of an group entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `group` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the GroupRbacobjectAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {*} [props.group.rbacobject] - The rbacobject attribute of the group entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <GroupRbacobjectAttribute group={groupEntity} />
 */
export const GroupRbacobjectAttribute = ({group}) => {
    const {rbacobject} = group
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}