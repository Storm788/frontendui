import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * StateTransitionChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `statetransition` entity along with other props to all child elements.
 * This component is useful for injecting a common `statetransition` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionChildren component.
 * @param {any} props.statetransition - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `statetransition` entity.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { id: 1, message: "No data available" };
 *
 * <StateTransitionChildren statetransition={statetransitionEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </StateTransitionChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'statetransition' prop with the specified entity.
 */
export const StateTransitionChildren = ({statetransition, children, ...props}) => <ChildWrapper statetransition={statetransition} children={children} {...props} />