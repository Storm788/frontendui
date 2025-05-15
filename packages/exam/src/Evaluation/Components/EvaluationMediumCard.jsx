import { PersonFill } from "react-bootstrap-icons"
import { EvaluationLink } from "./EvaluationLink"
import { EvaluationCardCapsule } from "./EvaluationCardCapsule"
import { EvaluationMediumContent } from "./EvaluationMediumContent"

/**
 * A card component that displays detailed content for an evaluation entity.
 *
 * This component combines `EvaluationCardCapsule` and `EvaluationMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the evaluation entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the EvaluationMediumCard component.
 * @param {Object} props.evaluation - The object representing the evaluation entity.
 * @param {string|number} props.evaluation.id - The unique identifier for the evaluation entity.
 * @param {string} props.evaluation.name - The name or label of the evaluation entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const evaluationEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EvaluationMediumCard evaluation={evaluationEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </EvaluationMediumCard>
 */
export const EvaluationMediumCard = ({evaluation, children}) => {
    return (
        <EvaluationCardCapsule title={<><PersonFill /> <EvaluationLink evaluation={evaluation} /></>}>
            <EvaluationMediumContent evaluation={evaluation}>
                {children}
            </EvaluationMediumContent>
        </EvaluationCardCapsule>
    )
}
