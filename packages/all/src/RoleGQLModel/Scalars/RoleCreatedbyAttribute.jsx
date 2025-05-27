/**
 * A component for displaying the `createdby` attribute of an role entity.
 *
 * This component checks if the `createdby` attribute exists on the `role` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the RoleCreatedbyAttribute component.
 * @param {Object} props.role - The object representing the role entity.
 * @param {*} [props.role.createdby] - The createdby attribute of the role entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const roleEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <RoleCreatedbyAttribute role={roleEntity} />
 */
export const RoleCreatedbyAttribute = ({role}) => {
    const {createdby} = role
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