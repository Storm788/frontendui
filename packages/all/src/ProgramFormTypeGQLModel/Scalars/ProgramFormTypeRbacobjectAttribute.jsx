/**
 * A component for displaying the `rbacobject` attribute of an programformtype entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `programformtype` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramFormTypeRbacobjectAttribute component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {*} [props.programformtype.rbacobject] - The rbacobject attribute of the programformtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <ProgramFormTypeRbacobjectAttribute programformtype={programformtypeEntity} />
 */
export const ProgramFormTypeRbacobjectAttribute = ({programformtype}) => {
    const {rbacobject} = programformtype
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