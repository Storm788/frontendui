/**
 * A component for displaying the `rbacobject` attribute of an programtype entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `programtype` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeRbacobjectAttribute component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {*} [props.programtype.rbacobject] - The rbacobject attribute of the programtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <ProgramTypeRbacobjectAttribute programtype={programtypeEntity} />
 */
export const ProgramTypeRbacobjectAttribute = ({programtype}) => {
    const {rbacobject} = programtype
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