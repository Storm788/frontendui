/**
 * A component for displaying the `evaluation` attribute of an exam entity.
 *
 * This component checks if the `evaluation` attribute exists on the `exam` object. If `evaluation` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `evaluation` attribute.
 *
 * @component
 * @param {Object} props - The props for the ExamEvaluationAttribute component.
 * @param {Object} props.exam - The object representing the exam entity.
 * @param {*} [props.exam.evaluation] - The evaluation attribute of the exam entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `evaluation` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const examEntity = { evaluation: { id: 1, name: "Sample Evaluation" } };
 *
 * <ExamEvaluationAttribute exam={examEntity} />
 */
import { EvaluationLink } from "../../Evaluation"

export const ExamEvaluationAttribute = ({exam}) => {
    const {evaluation} = exam
    //if (typeof evaluation === 'undefined') return null
    return (
        <>
            <EvaluationLink evaluation={evaluation} />
        </>
    )
}