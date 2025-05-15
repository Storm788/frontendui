import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { _uriprefix } from "../../_uriprefix";

export const GroupURI = `/${_uriprefix}/group/view/`;

/**
 * A React component that renders a `ProxyLink` to an "group" entity's view page.
 *
 * The target URL is dynamically constructed using the `group` object's `id`, and the link displays
 * the `group` object's `name` as its clickable content.
 *
 * @function GroupLink
 * @param {Object} props - The properties for the `GroupLink` component.
 * @param {Object} props.group - The object representing the "group" entity.
 * @param {string|number} props.group.id - The unique identifier for the "group" entity. Used to construct the target URL.
 * @param {string} props.group.name - The display name for the "group" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "group" entity's view page.
 *
 * @example
 * // Example usage with a sample group entity:
 * const groupEntity = { id: 123, name: "Example Group Entity" };
 * 
 * <GroupLink group={groupEntity} />
 * // Renders: <ProxyLink to="/group/group/view/123">Example Group Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/group/group/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const GroupLink = ({group}) => {
    return <ProxyLink to={GroupURI + group.id}>{group.name}</ProxyLink>
}