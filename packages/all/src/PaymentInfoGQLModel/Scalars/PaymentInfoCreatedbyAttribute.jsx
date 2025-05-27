/**
 * A component for displaying the `createdby` attribute of an paymentinfo entity.
 *
 * This component checks if the `createdby` attribute exists on the `paymentinfo` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentInfoCreatedbyAttribute component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {*} [props.paymentinfo.createdby] - The createdby attribute of the paymentinfo entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <PaymentInfoCreatedbyAttribute paymentinfo={paymentinfoEntity} />
 */
export const PaymentInfoCreatedbyAttribute = ({paymentinfo}) => {
    const {createdby} = paymentinfo
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