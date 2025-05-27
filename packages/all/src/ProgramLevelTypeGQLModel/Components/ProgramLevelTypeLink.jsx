import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const ProgramLevelTypeURI = `${URIRoot}/programleveltype/view/`;

/**
 * A React component that renders a `ProxyLink` to an "programleveltype" entity's view page.
 *
 * The target URL is dynamically constructed using the `programleveltype` object's `id`, and the link displays
 * the `programleveltype` object's `name` as its clickable content.
 *
 * @function ProgramLevelTypeLink
 * @param {Object} props - The properties for the `ProgramLevelTypeLink` component.
 * @param {Object} props.programleveltype - The object representing the "programleveltype" entity.
 * @param {string|number} props.programleveltype.id - The unique identifier for the "programleveltype" entity. Used to construct the target URL.
 * @param {string} props.programleveltype.name - The display name for the "programleveltype" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "programleveltype" entity's view page.
 *
 * @example
 * // Example usage with a sample programleveltype entity:
 * const programleveltypeEntity = { id: 123, name: "Example ProgramLevelType Entity" };
 * 
 * <ProgramLevelTypeLink programleveltype={programleveltypeEntity} />
 * // Renders: <ProxyLink to="/programleveltype/programleveltype/view/123">Example ProgramLevelType Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/programleveltype/programleveltype/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ProgramLevelTypeLink = ({programleveltype, ...props}) => {
    return <ProxyLink to={ProgramLevelTypeURI + programleveltype.id} {...props}>{programleveltype.name}</ProxyLink>
}