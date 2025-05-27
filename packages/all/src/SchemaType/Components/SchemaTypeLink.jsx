import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const SchemaTypeURI = `/system/type/view/`;

/**
 * A React component that renders a `ProxyLink` to an "schematype" entity's view page.
 *
 * The target URL is dynamically constructed using the `schematype` object's `id`, and the link displays
 * the `schematype` object's `name` as its clickable content.
 *
 * @function SchemaTypeLink
 * @param {Object} props - The properties for the `SchemaTypeLink` component.
 * @param {Object} props.schematype - The object representing the "schematype" entity.
 * @param {string|number} props.schematype.id - The unique identifier for the "schematype" entity. Used to construct the target URL.
 * @param {string} props.schematype.name - The display name for the "schematype" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "schematype" entity's view page.
 *
 * @example
 * // Example usage with a sample schematype entity:
 * const schematypeEntity = { id: 123, name: "Example SchemaType Entity" };
 * 
 * <SchemaTypeLink schematype={schematypeEntity} />
 * // Renders: <ProxyLink to="/schematype/schematype/view/123">Example SchemaType Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/system/schematype/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const SchemaTypeLink = ({schematype, ...props}) => {
    return <ProxyLink to={SchemaTypeURI + schematype.name} {...props}>{schematype.name}</ProxyLink>
}