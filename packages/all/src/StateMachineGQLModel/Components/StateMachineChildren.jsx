import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * StateMachineChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `statemachine` entity along with other props to all child elements.
 * This component is useful for injecting a common `statemachine` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the StateMachineChildren component.
 * @param {any} props.statemachine - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `statemachine` entity.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { id: 1, message: "No data available" };
 *
 * <StateMachineChildren statemachine={statemachineEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </StateMachineChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'statemachine' prop with the specified entity.
 */
export const StateMachineChildren = ({statemachine, children, ...props}) => <ChildWrapper statemachine={statemachine} children={children} {...props} />