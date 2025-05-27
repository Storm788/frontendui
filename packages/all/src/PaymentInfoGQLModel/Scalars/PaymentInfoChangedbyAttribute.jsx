/**
 * A component for displaying the `changedby` attribute of an paymentinfo entity.
 *
 * This component checks if the `changedby` attribute exists on the `paymentinfo` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentInfoChangedbyAttribute component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {*} [props.paymentinfo.changedby] - The changedby attribute of the paymentinfo entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <PaymentInfoChangedbyAttribute paymentinfo={paymentinfoEntity} />
 */
export const PaymentInfoChangedbyAttribute = ({paymentinfo}) => {
    const {changedby} = paymentinfo
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