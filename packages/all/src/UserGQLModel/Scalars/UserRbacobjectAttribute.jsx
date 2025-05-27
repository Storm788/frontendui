/**
 * A component for displaying the `rbacobject` attribute of an user entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `user` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the UserRbacobjectAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {*} [props.user.rbacobject] - The rbacobject attribute of the user entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <UserRbacobjectAttribute user={userEntity} />
 */
export const UserRbacobjectAttribute = ({user}) => {
    const {rbacobject} = user
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}