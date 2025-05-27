import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const ProgramLanguageTypeURI = `${URIRoot}/programlanguagetype/view/`;

/**
 * A React component that renders a `ProxyLink` to an "programlanguagetype" entity's view page.
 *
 * The target URL is dynamically constructed using the `programlanguagetype` object's `id`, and the link displays
 * the `programlanguagetype` object's `name` as its clickable content.
 *
 * @function ProgramLanguageTypeLink
 * @param {Object} props - The properties for the `ProgramLanguageTypeLink` component.
 * @param {Object} props.programlanguagetype - The object representing the "programlanguagetype" entity.
 * @param {string|number} props.programlanguagetype.id - The unique identifier for the "programlanguagetype" entity. Used to construct the target URL.
 * @param {string} props.programlanguagetype.name - The display name for the "programlanguagetype" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "programlanguagetype" entity's view page.
 *
 * @example
 * // Example usage with a sample programlanguagetype entity:
 * const programlanguagetypeEntity = { id: 123, name: "Example ProgramLanguageType Entity" };
 * 
 * <ProgramLanguageTypeLink programlanguagetype={programlanguagetypeEntity} />
 * // Renders: <ProxyLink to="/programlanguagetype/programlanguagetype/view/123">Example ProgramLanguageType Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/programlanguagetype/programlanguagetype/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ProgramLanguageTypeLink = ({programlanguagetype, ...props}) => {
    return <ProxyLink to={ProgramLanguageTypeURI + programlanguagetype.id} {...props}>{programlanguagetype.name}</ProxyLink>
}