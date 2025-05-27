/**
 * A component for displaying the `rbacobject` attribute of an semester entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `semester` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the SemesterRbacobjectAttribute component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {*} [props.semester.rbacobject] - The rbacobject attribute of the semester entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <SemesterRbacobjectAttribute semester={semesterEntity} />
 */
export const SemesterRbacobjectAttribute = ({semester}) => {
    const {rbacobject} = semester
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}