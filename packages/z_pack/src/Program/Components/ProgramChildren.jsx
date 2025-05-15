import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `program` entity along with other props to all child elements.
 * This component is useful for injecting a common `program` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ProgramChildren component.
 * @param {any} props.program - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `program` entity.
 *
 * @example
 * // Example usage:
 * const programEntity = { id: 1, message: "No data available" };
 *
 * <ProgramChildren program={programEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ProgramChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'program' prop with the specified entity.
 */
export const ProgramChildren = ({program, children, ...props}) => <ChildWrapper program={program} children={children} {...props} />