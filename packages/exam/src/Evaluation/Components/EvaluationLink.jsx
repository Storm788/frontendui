import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const EvaluationURI = '/evaluation/';

/**
 * A React component that renders a `ProxyLink` to an "evaluation" entity's view page.
 *
 * The target URL is dynamically constructed using the `evaluation` object's `id`, and the link displays
 * the `evaluation` object's `name` as its clickable content.
 *
 * @function EvaluationLink
 * @param {Object} props - The properties for the `EvaluationLink` component.
 * @param {Object} props.evaluation - The object representing the "evaluation" entity.
 * @param {string|number} props.evaluation.id - The unique identifier for the "evaluation" entity. Used to construct the target URL.
 * @param {string} props.evaluation.name - The display name for the "evaluation" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "evaluation" entity's view page.
 *
 * @example
 * // Example usage with a sample evaluation entity:
 * const evaluationEntity = { id: 123, name: "Example Evaluation Entity" };
 * 
 * <EvaluationLink evaluation={evaluationEntity} />
 * // Renders: <ProxyLink to="/evaluation/evaluation/view/123">Example Evaluation Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/evaluation/evaluation/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const EvaluationLink = ({evaluation}) => {
    return <ProxyLink to={EvaluationURI + evaluation.id}>{evaluation.name}</ProxyLink>
}