import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramLevelTypeChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `programleveltype` entity along with other props to all child elements.
 * This component is useful for injecting a common `programleveltype` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ProgramLevelTypeChildren component.
 * @param {any} props.programleveltype - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `programleveltype` entity.
 *
 * @example
 * // Example usage:
 * const programleveltypeEntity = { id: 1, message: "No data available" };
 *
 * <ProgramLevelTypeChildren programleveltype={programleveltypeEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ProgramLevelTypeChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'programleveltype' prop with the specified entity.
 */
export const ProgramLevelTypeChildren = ({programleveltype, children, ...props}) => <ChildWrapper programleveltype={programleveltype} children={children} {...props} />