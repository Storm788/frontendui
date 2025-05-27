/**
 * A component for displaying the `student` attribute of an payment entity.
 *
 * This component checks if the `student` attribute exists on the `payment` object. If `student` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `student` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentStudentAttribute component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {*} [props.payment.student] - The student attribute of the payment entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `student` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { student: { id: 1, name: "Sample Student" } };
 *
 * <PaymentStudentAttribute payment={paymentEntity} />
 */
export const PaymentStudentAttribute = ({payment}) => {
    const {student} = payment
    if (typeof student === 'undefined') return null
    return (
        <>
            {/* <StudentMediumCard student={student} /> */}
            {/* <StudentLink student={student} /> */}
            Probably {'<StudentMediumCard student=\{student\} />'} <br />
            <pre>{JSON.stringify(student, null, 4)}</pre>
        </>
    )
}