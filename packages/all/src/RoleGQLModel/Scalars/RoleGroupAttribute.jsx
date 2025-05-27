/**
 * A component for displaying the `group` attribute of an role entity.
 *
 * This component checks if the `group` attribute exists on the `role` object. If `group` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `group` attribute.
 *
 * @component
 * @param {Object} props - The props for the RoleGroupAttribute component.
 * @param {Object} props.role - The object representing the role entity.
 * @param {*} [props.role.group] - The group attribute of the role entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `group` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const roleEntity = { group: { id: 1, name: "Sample Group" } };
 *
 * <RoleGroupAttribute role={roleEntity} />
 */
export const RoleGroupAttribute = ({role}) => {
    const {group} = role
    if (typeof group === 'undefined') return null
    return (
        <>
            {/* <GroupMediumCard group={group} /> */}
            {/* <GroupLink group={group} /> */}
            Probably {'<GroupMediumCard group=\{group\} />'} <br />
            <pre>{JSON.stringify(group, null, 4)}</pre>
        </>
    )
}