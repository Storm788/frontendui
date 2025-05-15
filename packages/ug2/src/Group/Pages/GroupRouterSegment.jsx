import { GroupURI } from "../Components/GroupLink"
import { GroupPage } from "./GroupPage"

/**
 * A router segment definition for the Group page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `GroupURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} GroupRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/group/group/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <GroupPage />.
 */
export const GroupRouterSegment = {
    path: `/${GroupURI}:id`,
    element: <GroupPage />,
}