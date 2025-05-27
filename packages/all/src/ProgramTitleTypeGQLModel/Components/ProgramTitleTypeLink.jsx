import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const ProgramTitleTypeURI = `${URIRoot}/programtitletype/view/`;

/**
 * A React component that renders a `ProxyLink` to an "programtitletype" entity's view page.
 *
 * The target URL is dynamically constructed using the `programtitletype` object's `id`, and the link displays
 * the `programtitletype` object's `name` as its clickable content.
 *
 * @function ProgramTitleTypeLink
 * @param {Object} props - The properties for the `ProgramTitleTypeLink` component.
 * @param {Object} props.programtitletype - The object representing the "programtitletype" entity.
 * @param {string|number} props.programtitletype.id - The unique identifier for the "programtitletype" entity. Used to construct the target URL.
 * @param {string} props.programtitletype.name - The display name for the "programtitletype" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "programtitletype" entity's view page.
 *
 * @example
 * // Example usage with a sample programtitletype entity:
 * const programtitletypeEntity = { id: 123, name: "Example ProgramTitleType Entity" };
 * 
 * <ProgramTitleTypeLink programtitletype={programtitletypeEntity} />
 * // Renders: <ProxyLink to="/programtitletype/programtitletype/view/123">Example ProgramTitleType Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/programtitletype/programtitletype/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ProgramTitleTypeLink = ({programtitletype, ...props}) => {
    return <ProxyLink to={ProgramTitleTypeURI + programtitletype.id} {...props}>{programtitletype.name}</ProxyLink>
}