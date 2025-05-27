/**
 * A component for displaying the `changedby` attribute of an role entity.
 *
 * This component checks if the `changedby` attribute exists on the `role` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the RoleChangedbyAttribute component.
 * @param {Object} props.role - The object representing the role entity.
 * @param {*} [props.role.changedby] - The changedby attribute of the role entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const roleEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <RoleChangedbyAttribute role={roleEntity} />
 */
export const RoleChangedbyAttribute = ({role}) => {
    const {changedby} = role
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