/**
 * A component for displaying the `rbacobject` attribute of an state entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `state` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateRbacobjectAttribute component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {*} [props.state.rbacobject] - The rbacobject attribute of the state entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const stateEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <StateRbacobjectAttribute state={stateEntity} />
 */
export const StateRbacobjectAttribute = ({state}) => {
    const {rbacobject} = state
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