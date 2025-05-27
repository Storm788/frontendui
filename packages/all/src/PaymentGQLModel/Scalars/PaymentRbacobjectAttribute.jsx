/**
 * A component for displaying the `rbacobject` attribute of an payment entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `payment` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentRbacobjectAttribute component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {*} [props.payment.rbacobject] - The rbacobject attribute of the payment entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <PaymentRbacobjectAttribute payment={paymentEntity} />
 */
export const PaymentRbacobjectAttribute = ({payment}) => {
    const {rbacobject} = payment
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