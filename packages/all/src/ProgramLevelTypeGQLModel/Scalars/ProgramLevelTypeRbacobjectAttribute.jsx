/**
 * A component for displaying the `rbacobject` attribute of an programleveltype entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `programleveltype` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLevelTypeRbacobjectAttribute component.
 * @param {Object} props.programleveltype - The object representing the programleveltype entity.
 * @param {*} [props.programleveltype.rbacobject] - The rbacobject attribute of the programleveltype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programleveltypeEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <ProgramLevelTypeRbacobjectAttribute programleveltype={programleveltypeEntity} />
 */
export const ProgramLevelTypeRbacobjectAttribute = ({programleveltype}) => {
    const {rbacobject} = programleveltype
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