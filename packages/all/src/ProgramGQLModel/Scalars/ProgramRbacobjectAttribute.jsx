/**
 * A component for displaying the `rbacobject` attribute of an program entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `program` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramRbacobjectAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {*} [props.program.rbacobject] - The rbacobject attribute of the program entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <ProgramRbacobjectAttribute program={programEntity} />
 */
export const ProgramRbacobjectAttribute = ({program}) => {
    const {rbacobject} = program
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}