import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramTitleTypeChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `programtitletype` entity along with other props to all child elements.
 * This component is useful for injecting a common `programtitletype` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ProgramTitleTypeChildren component.
 * @param {any} props.programtitletype - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `programtitletype` entity.
 *
 * @example
 * // Example usage:
 * const programtitletypeEntity = { id: 1, message: "No data available" };
 *
 * <ProgramTitleTypeChildren programtitletype={programtitletypeEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ProgramTitleTypeChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'programtitletype' prop with the specified entity.
 */
export const ProgramTitleTypeChildren = ({programtitletype, children, ...props}) => <ChildWrapper programtitletype={programtitletype} children={children} {...props} />