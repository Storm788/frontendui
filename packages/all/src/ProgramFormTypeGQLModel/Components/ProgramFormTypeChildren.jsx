import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramFormTypeChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `programformtype` entity along with other props to all child elements.
 * This component is useful for injecting a common `programformtype` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ProgramFormTypeChildren component.
 * @param {any} props.programformtype - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `programformtype` entity.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { id: 1, message: "No data available" };
 *
 * <ProgramFormTypeChildren programformtype={programformtypeEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ProgramFormTypeChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'programformtype' prop with the specified entity.
 */
export const ProgramFormTypeChildren = ({programformtype, children, ...props}) => <ChildWrapper programformtype={programformtype} children={children} {...props} />