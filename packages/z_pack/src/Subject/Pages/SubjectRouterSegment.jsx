import { SubjectURI } from "../Components/SubjectLink"
import { SubjectPage } from "./SubjectPage"

/**
 * A router segment definition for the Subject page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `SubjectURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} SubjectRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/subject/subject/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <SubjectPage />.
 */
export const SubjectRouterSegment = {
    path: `/${SubjectURI}:id`,
    element: <SubjectPage />,
}