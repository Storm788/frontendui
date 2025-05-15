/**
 * A component for displaying the `scalar` attribute of an exam entity.
 *
 * This component checks if the `scalar` attribute exists on the `exam` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the ExamScalarAttribute component.
 * @param {Object} props.exam - The object representing the exam entity.
 * @param {*} [props.exam.scalar] - The scalar attribute of the exam entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const examEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <ExamScalarAttribute exam={examEntity} />
 */
export const ExamScalarAttribute = ({exam}) => {
    const {scalar} = exam
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}