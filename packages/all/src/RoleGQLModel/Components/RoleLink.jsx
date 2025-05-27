import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const RoleURI = `${URIRoot}/role/view/`;

/**
 * A React component that renders a `ProxyLink` to an "role" entity's view page.
 *
 * The target URL is dynamically constructed using the `role` object's `id`, and the link displays
 * the `role` object's `name` as its clickable content.
 *
 * @function RoleLink
 * @param {Object} props - The properties for the `RoleLink` component.
 * @param {Object} props.role - The object representing the "role" entity.
 * @param {string|number} props.role.id - The unique identifier for the "role" entity. Used to construct the target URL.
 * @param {string} props.role.name - The display name for the "role" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "role" entity's view page.
 *
 * @example
 * // Example usage with a sample role entity:
 * const roleEntity = { id: 123, name: "Example Role Entity" };
 * 
 * <RoleLink role={roleEntity} />
 * // Renders: <ProxyLink to="/role/role/view/123">Example Role Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/role/role/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const RoleLink = ({role, ...props}) => {
    return <ProxyLink to={RoleURI + role.id} {...props}>{role.name}</ProxyLink>
}