/**
 * A component for displaying the `rbacobject` attribute of an student entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `student` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudentRbacobjectAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {*} [props.student.rbacobject] - The rbacobject attribute of the student entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <StudentRbacobjectAttribute student={studentEntity} />
 */
export const StudentRbacobjectAttribute = ({student}) => {
    const {rbacobject} = student
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}