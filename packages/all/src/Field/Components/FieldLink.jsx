import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const FieldURI = `/system/field/view/`;

/**
 * A React component that renders a `ProxyLink` to an "field" entity's view page.
 *
 * The target URL is dynamically constructed using the `field` object's `id`, and the link displays
 * the `field` object's `name` as its clickable content.
 *
 * @function FieldLink
 * @param {Object} props - The properties for the `FieldLink` component.
 * @param {Object} props.field - The object representing the "field" entity.
 * @param {string|number} props.field.id - The unique identifier for the "field" entity. Used to construct the target URL.
 * @param {string} props.field.name - The display name for the "field" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "field" entity's view page.
 *
 * @example
 * // Example usage with a sample field entity:
 * const fieldEntity = { id: 123, name: "Example Field Entity" };
 * 
 * <FieldLink field={fieldEntity} />
 * // Renders: <ProxyLink to="/field/field/view/123">Example Field Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/system/field/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const FieldLink = ({field, ...props}) => {
    return <ProxyLink to={FieldURI + field.name} {...props}>{field.name}</ProxyLink>
}