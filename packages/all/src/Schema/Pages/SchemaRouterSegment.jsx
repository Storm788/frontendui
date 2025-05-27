import { SchemaURI } from "../Components/SchemaLink"
import { SchemaPage } from "./SchemaPage"

/**
 * A router segment definition for the Schema page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `SchemaURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} SchemaRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/schema/schema/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <SchemaPage />.
 */
export const SchemaRouterSegment = {
    path: `/${SchemaURI}`,
    element: <SchemaPage />,
}