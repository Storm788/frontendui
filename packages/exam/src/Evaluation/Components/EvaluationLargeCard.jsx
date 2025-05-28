import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { EvaluationCardCapsule } from "./EvaluationCardCapsule"
import { EvaluationMediumCard } from "./EvaluationMediumCard"
import { EvaluationList } from "./EvaluatianData"

/**
 * A large card component for displaying detailed content and layout for an evaluation entity.
 *
 * This component wraps an `EvaluationCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `EvaluationMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the EvaluationLargeCard component.
 * @param {Object} props.evaluation - The object representing the evaluation entity.
 * @param {string|number} props.evaluation.id - The unique identifier for the evaluation entity.
 * @param {string} props.evaluation.name - The name or label of the evaluation entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const evaluationEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EvaluationLargeCard evaluation={evaluationEntity}>
 *   <p>Additional content for the middle column.</p>
 * </EvaluationLargeCard>
 */
export const EvaluationLargeCard = ({evaluation, children}) => {
    return (
        <EvaluationCardCapsule evaluation={evaluation} >
            <Row>
                <LeftColumn>
                    <EvaluationList evaluation={evaluation} />
                    <EvaluationMediumCard evaluation={evaluation}/>

                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </EvaluationCardCapsule>
    )
}
