import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const ProgramTypeURI = `${URIRoot}/programtype/view/`;

/**
 * A React component that renders a `ProxyLink` to an "programtype" entity's view page.
 *
 * The target URL is dynamically constructed using the `programtype` object's `id`, and the link displays
 * the `programtype` object's `name` as its clickable content.
 *
 * @function ProgramTypeLink
 * @param {Object} props - The properties for the `ProgramTypeLink` component.
 * @param {Object} props.programtype - The object representing the "programtype" entity.
 * @param {string|number} props.programtype.id - The unique identifier for the "programtype" entity. Used to construct the target URL.
 * @param {string} props.programtype.name - The display name for the "programtype" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "programtype" entity's view page.
 *
 * @example
 * // Example usage with a sample programtype entity:
 * const programtypeEntity = { id: 123, name: "Example ProgramType Entity" };
 * 
 * <ProgramTypeLink programtype={programtypeEntity} />
 * // Renders: <ProxyLink to="/programtype/programtype/view/123">Example ProgramType Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/programtype/programtype/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ProgramTypeLink = ({programtype, ...props}) => {
    return <ProxyLink to={ProgramTypeURI + programtype.id} {...props}>{programtype.name}</ProxyLink>
}