import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const ProgramFormTypeURI = `${URIRoot}/programformtype/view/`;

/**
 * A React component that renders a `ProxyLink` to an "programformtype" entity's view page.
 *
 * The target URL is dynamically constructed using the `programformtype` object's `id`, and the link displays
 * the `programformtype` object's `name` as its clickable content.
 *
 * @function ProgramFormTypeLink
 * @param {Object} props - The properties for the `ProgramFormTypeLink` component.
 * @param {Object} props.programformtype - The object representing the "programformtype" entity.
 * @param {string|number} props.programformtype.id - The unique identifier for the "programformtype" entity. Used to construct the target URL.
 * @param {string} props.programformtype.name - The display name for the "programformtype" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "programformtype" entity's view page.
 *
 * @example
 * // Example usage with a sample programformtype entity:
 * const programformtypeEntity = { id: 123, name: "Example ProgramFormType Entity" };
 * 
 * <ProgramFormTypeLink programformtype={programformtypeEntity} />
 * // Renders: <ProxyLink to="/programformtype/programformtype/view/123">Example ProgramFormType Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/programformtype/programformtype/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ProgramFormTypeLink = ({programformtype, ...props}) => {
    return <ProxyLink to={ProgramFormTypeURI + programformtype.id} {...props}>{programformtype.name}</ProxyLink>
}