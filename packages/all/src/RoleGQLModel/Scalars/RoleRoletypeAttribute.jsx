/**
 * A component for displaying the `roletype` attribute of an role entity.
 *
 * This component checks if the `roletype` attribute exists on the `role` object. If `roletype` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `roletype` attribute.
 *
 * @component
 * @param {Object} props - The props for the RoleRoletypeAttribute component.
 * @param {Object} props.role - The object representing the role entity.
 * @param {*} [props.role.roletype] - The roletype attribute of the role entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `roletype` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const roleEntity = { roletype: { id: 1, name: "Sample Roletype" } };
 *
 * <RoleRoletypeAttribute role={roleEntity} />
 */
export const RoleRoletypeAttribute = ({role}) => {
    const {roletype} = role
    if (typeof roletype === 'undefined') return null
    return (
        <>
            {/* <RoletypeMediumCard roletype={roletype} /> */}
            {/* <RoletypeLink roletype={roletype} /> */}
            Probably {'<RoletypeMediumCard roletype=\{roletype\} />'} <br />
            <pre>{JSON.stringify(roletype, null, 4)}</pre>
        </>
    )
}