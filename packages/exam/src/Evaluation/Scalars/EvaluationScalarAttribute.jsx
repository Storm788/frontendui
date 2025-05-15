/**
 * A component for displaying the `scalar` attribute of an evaluation entity.
 *
 * This component checks if the `scalar` attribute exists on the `evaluation` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the EvaluationScalarAttribute component.
 * @param {Object} props.evaluation - The object representing the evaluation entity.
 * @param {*} [props.evaluation.scalar] - The scalar attribute of the evaluation entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const evaluationEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <EvaluationScalarAttribute evaluation={evaluationEntity} />
 */
export const EvaluationScalarAttribute = ({evaluation}) => {
    const {scalar} = evaluation
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}