/**
 * A component for displaying the `admission` attribute of an paymentinfo entity.
 *
 * This component checks if the `admission` attribute exists on the `paymentinfo` object. If `admission` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `admission` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentInfoAdmissionAttribute component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {*} [props.paymentinfo.admission] - The admission attribute of the paymentinfo entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `admission` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { admission: { id: 1, name: "Sample Admission" } };
 *
 * <PaymentInfoAdmissionAttribute paymentinfo={paymentinfoEntity} />
 */
export const PaymentInfoAdmissionAttribute = ({paymentinfo}) => {
    const {admission} = paymentinfo
    if (typeof admission === 'undefined') return null
    return (
        <>
            {/* <AdmissionMediumCard admission={admission} /> */}
            {/* <AdmissionLink admission={admission} /> */}
            Probably {'<AdmissionMediumCard admission=\{admission\} />'} <br />
            <pre>{JSON.stringify(admission, null, 4)}</pre>
        </>
    )
}