/**
 * A component for displaying the `changedby` attribute of an payment entity.
 *
 * This component checks if the `changedby` attribute exists on the `payment` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentChangedbyAttribute component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {*} [props.payment.changedby] - The changedby attribute of the payment entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <PaymentChangedbyAttribute payment={paymentEntity} />
 */
export const PaymentChangedbyAttribute = ({payment}) => {
    const {changedby} = payment
    if (typeof changedby === 'undefined') return null
    return (
        <>
            {/* <ChangedbyMediumCard changedby={changedby} /> */}
            {/* <ChangedbyLink changedby={changedby} /> */}
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}