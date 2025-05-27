import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramLanguageTypeChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `programlanguagetype` entity along with other props to all child elements.
 * This component is useful for injecting a common `programlanguagetype` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ProgramLanguageTypeChildren component.
 * @param {any} props.programlanguagetype - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `programlanguagetype` entity.
 *
 * @example
 * // Example usage:
 * const programlanguagetypeEntity = { id: 1, message: "No data available" };
 *
 * <ProgramLanguageTypeChildren programlanguagetype={programlanguagetypeEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ProgramLanguageTypeChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'programlanguagetype' prop with the specified entity.
 */
export const ProgramLanguageTypeChildren = ({programlanguagetype, children, ...props}) => <ChildWrapper programlanguagetype={programlanguagetype} children={children} {...props} />