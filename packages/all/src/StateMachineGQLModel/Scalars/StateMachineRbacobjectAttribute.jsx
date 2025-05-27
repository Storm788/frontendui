/**
 * A component for displaying the `rbacobject` attribute of an statemachine entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `statemachine` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateMachineRbacobjectAttribute component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {*} [props.statemachine.rbacobject] - The rbacobject attribute of the statemachine entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <StateMachineRbacobjectAttribute statemachine={statemachineEntity} />
 */
export const StateMachineRbacobjectAttribute = ({statemachine}) => {
    const {rbacobject} = statemachine
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