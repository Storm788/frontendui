import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const EmptyURI = `/empty/empty/view/`;

/**
 * A React component that renders a `ProxyLink` to an "empty" entity's view page.
 *
 * The target URL is dynamically constructed using the `empty` object's `id`, and the link displays
 * the `empty` object's `name` as its clickable content.
 *
 * @function EmptyLink
 * @param {Object} props - The properties for the `EmptyLink` component.
 * @param {Object} props.empty - The object representing the "empty" entity.
 * @param {string|number} props.empty.id - The unique identifier for the "empty" entity. Used to construct the target URL.
 * @param {string} props.empty.name - The display name for the "empty" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "empty" entity's view page.
 *
 * @example
 * // Example usage with a sample empty entity:
 * const emptyEntity = { id: 123, name: "Example Empty Entity" };
 * 
 * <EmptyLink empty={emptyEntity} />
 * // Renders: <ProxyLink to="/empty/empty/view/123">Example Empty Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/empty/empty/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const EmptyLink = ({empty, ...props}) => {
    return <ProxyLink to={EmptyURI + empty.id} {...props}>{empty.name}</ProxyLink>
}