import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * StateChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `state` entity along with other props to all child elements.
 * This component is useful for injecting a common `state` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the StateChildren component.
 * @param {any} props.state - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `state` entity.
 *
 * @example
 * // Example usage:
 * const stateEntity = { id: 1, message: "No data available" };
 *
 * <StateChildren state={stateEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </StateChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'state' prop with the specified entity.
 */
export const StateChildren = ({state, children, ...props}) => <ChildWrapper state={state} children={children} {...props} />