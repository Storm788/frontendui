import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const SchemaURI = `/system/schema/view/`;

/**
 * A React component that renders a `ProxyLink` to an "schema" entity's view page.
 *
 * The target URL is dynamically constructed using the `schema` object's `id`, and the link displays
 * the `schema` object's `name` as its clickable content.
 *
 * @function SchemaLink
 * @param {Object} props - The properties for the `SchemaLink` component.
 * @param {Object} props.schema - The object representing the "schema" entity.
 * @param {string|number} props.schema.id - The unique identifier for the "schema" entity. Used to construct the target URL.
 * @param {string} props.schema.name - The display name for the "schema" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "schema" entity's view page.
 *
 * @example
 * // Example usage with a sample schema entity:
 * const schemaEntity = { id: 123, name: "Example Schema Entity" };
 * 
 * <SchemaLink schema={schemaEntity} />
 * // Renders: <ProxyLink to="/schema/schema/view/123">Example Schema Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/system/schema/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const SchemaLink = ({schema, ...props}) => {
    return <ProxyLink to={SchemaURI + schema.id} {...props}>{schema.name}</ProxyLink>
}