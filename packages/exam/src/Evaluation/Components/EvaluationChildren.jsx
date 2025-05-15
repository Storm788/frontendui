import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * EvaluationChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `evaluation` entity along with other props to all child elements.
 * This component is useful for injecting a common `evaluation` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the EvaluationChildren component.
 * @param {any} props.evaluation - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `evaluation` entity.
 *
 * @example
 * // Example usage:
 * const evaluationEntity = { id: 1, message: "No data available" };
 *
 * <EvaluationChildren evaluation={evaluationEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </EvaluationChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'evaluation' prop with the specified entity.
 */
export const EvaluationChildren = ({evaluation, children, ...props}) => <ChildWrapper evaluation={evaluation} children={children} {...props} />