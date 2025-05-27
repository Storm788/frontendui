/**
 * A component for displaying the `paymentinfo` attribute of an payment entity.
 *
 * This component checks if the `paymentinfo` attribute exists on the `payment` object. If `paymentinfo` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `paymentinfo` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentPaymentinfoAttribute component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {*} [props.payment.paymentinfo] - The paymentinfo attribute of the payment entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `paymentinfo` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { paymentinfo: { id: 1, name: "Sample Paymentinfo" } };
 *
 * <PaymentPaymentinfoAttribute payment={paymentEntity} />
 */
export const PaymentPaymentinfoAttribute = ({payment}) => {
    const {paymentinfo} = payment
    if (typeof paymentinfo === 'undefined') return null
    return (
        <>
            {/* <PaymentinfoMediumCard paymentinfo={paymentinfo} /> */}
            {/* <PaymentinfoLink paymentinfo={paymentinfo} /> */}
            Probably {'<PaymentinfoMediumCard paymentinfo=\{paymentinfo\} />'} <br />
            <pre>{JSON.stringify(paymentinfo, null, 4)}</pre>
        </>
    )
}