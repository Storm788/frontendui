/**
 * A component for displaying the `user` attribute of an role entity.
 *
 * This component checks if the `user` attribute exists on the `role` object. If `user` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `user` attribute.
 *
 * @component
 * @param {Object} props - The props for the RoleUserAttribute component.
 * @param {Object} props.role - The object representing the role entity.
 * @param {*} [props.role.user] - The user attribute of the role entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `user` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const roleEntity = { user: { id: 1, name: "Sample User" } };
 *
 * <RoleUserAttribute role={roleEntity} />
 */
export const RoleUserAttribute = ({role}) => {
    const {user} = role
    if (typeof user === 'undefined') return null
    return (
        <>
            {/* <UserMediumCard user={user} /> */}
            {/* <UserLink user={user} /> */}
            Probably {'<UserMediumCard user=\{user\} />'} <br />
            <pre>{JSON.stringify(user, null, 4)}</pre>
        </>
    )
}