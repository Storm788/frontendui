/**
 * A component for displaying the `createdby` attribute of an payment entity.
 *
 * This component checks if the `createdby` attribute exists on the `payment` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentCreatedbyAttribute component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {*} [props.payment.createdby] - The createdby attribute of the payment entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <PaymentCreatedbyAttribute payment={paymentEntity} />
 */
export const PaymentCreatedbyAttribute = ({payment}) => {
    const {createdby} = payment
    if (typeof createdby === 'undefined') return null
    return (
        <>
            {/* <CreatedbyMediumCard createdby={createdby} /> */}
            {/* <CreatedbyLink createdby={createdby} /> */}
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}