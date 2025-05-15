import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { _uriprefix } from "../../_uriprefix";

export const UserURI = `/${_uriprefix}/user/view/`;

/**
 * A React component that renders a `ProxyLink` to an "user" entity's view page.
 *
 * The target URL is dynamically constructed using the `user` object's `id`, and the link displays
 * the `user` object's `name` as its clickable content.
 *
 * @function UserLink
 * @param {Object} props - The properties for the `UserLink` component.
 * @param {Object} props.user - The object representing the "user" entity.
 * @param {string|number} props.user.id - The unique identifier for the "user" entity. Used to construct the target URL.
 * @param {string} props.user.name - The display name for the "user" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "user" entity's view page.
 *
 * @example
 * // Example usage with a sample user entity:
 * const userEntity = { id: 123, name: "Example User Entity" };
 * 
 * <UserLink user={userEntity} />
 * // Renders: <ProxyLink to="/user/user/view/123">Example User Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/user/user/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const UserLink = ({user}) => {
    return <ProxyLink to={UserURI + user.id}>{user.name} {user?.surname}</ProxyLink>
}