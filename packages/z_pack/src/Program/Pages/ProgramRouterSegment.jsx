import { ProgramURI } from "../Components/ProgramLink"
import { ProgramPage } from "./ProgramPage"

/**
 * A router segment definition for the Program page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `ProgramURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} ProgramRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/program/program/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <ProgramPage />.
 */
export const ProgramRouterSegment = {
    path: `/${ProgramURI}:id`,
    element: <ProgramPage />,
}