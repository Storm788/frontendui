import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { EvaluationLink } from "./EvaluationLink"

/**
 * A specialized card component that displays an `EvaluationLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `EvaluationLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `evaluation` object.
 *
 * @component
 * @param {Object} props - The props for the EvaluationCardCapsule component.
 * @param {Object} props.evaluation - The object representing the evaluation entity.
 * @param {string|number} props.evaluation.id - The unique identifier for the evaluation entity.
 * @param {string} props.evaluation.name - The display name for the evaluation entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { EvaluationCardCapsule } from './EvaluationCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const evaluationEntity = { id: 123, name: "Example Entity" };
 *
 * <EvaluationCardCapsule evaluation={evaluationEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </EvaluationCardCapsule>
 */
export const EvaluationCardCapsule = ({evaluation, children, title=<><PersonFill /> <EvaluationLink evaluation={evaluation} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
