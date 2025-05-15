import { EmptyURI } from "../Components/EmptyLink"
import { EmptyPage } from "./EmptyPage"

/**
 * A router segment definition for the Empty page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `EmptyURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} EmptyRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/empty/empty/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <EmptyPage />.
 */
export const EmptyRouterSegment = {
    path: `/${EmptyURI}:id`,
    element: <EmptyPage />,
}