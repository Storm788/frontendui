/**
 * A component for displaying the `rbacobject` attribute of an subject entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `subject` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the SubjectRbacobjectAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {*} [props.subject.rbacobject] - The rbacobject attribute of the subject entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <SubjectRbacobjectAttribute subject={subjectEntity} />
 */
export const SubjectRbacobjectAttribute = ({subject}) => {
    const {rbacobject} = subject
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}