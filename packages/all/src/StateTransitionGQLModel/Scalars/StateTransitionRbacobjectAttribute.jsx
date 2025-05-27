/**
 * A component for displaying the `rbacobject` attribute of an statetransition entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `statetransition` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionRbacobjectAttribute component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {*} [props.statetransition.rbacobject] - The rbacobject attribute of the statetransition entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <StateTransitionRbacobjectAttribute statetransition={statetransitionEntity} />
 */
export const StateTransitionRbacobjectAttribute = ({statetransition}) => {
    const {rbacobject} = statetransition
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