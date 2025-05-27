/**
 * A component for displaying the `rbacobject` attribute of an paymentinfo entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `paymentinfo` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentInfoRbacobjectAttribute component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {*} [props.paymentinfo.rbacobject] - The rbacobject attribute of the paymentinfo entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <PaymentInfoRbacobjectAttribute paymentinfo={paymentinfoEntity} />
 */
export const PaymentInfoRbacobjectAttribute = ({paymentinfo}) => {
    const {rbacobject} = paymentinfo
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