import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramTypeChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `programtype` entity along with other props to all child elements.
 * This component is useful for injecting a common `programtype` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeChildren component.
 * @param {any} props.programtype - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `programtype` entity.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { id: 1, message: "No data available" };
 *
 * <ProgramTypeChildren programtype={programtypeEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ProgramTypeChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'programtype' prop with the specified entity.
 */
export const ProgramTypeChildren = ({programtype, children, ...props}) => <ChildWrapper programtype={programtype} children={children} {...props} />