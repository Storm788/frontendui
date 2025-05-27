/**
 * A component for displaying the `payment` attribute of an student entity.
 *
 * This component checks if the `payment` attribute exists on the `student` object. If `payment` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `payment` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudentPaymentAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {*} [props.student.payment] - The payment attribute of the student entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `payment` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { payment: { id: 1, name: "Sample Payment" } };
 *
 * <StudentPaymentAttribute student={studentEntity} />
 */
export const StudentPaymentAttribute = ({student}) => {
    const {payment} = student
    if (typeof payment === 'undefined') return null
    return (
        <>
            Probably {'<PaymentMediumCard payment=\{payment\} />'} <br />
            <pre>{JSON.stringify(payment, null, 4)}</pre>
        </>
    )
}