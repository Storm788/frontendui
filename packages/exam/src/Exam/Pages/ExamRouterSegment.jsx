import { ExamURI } from "../Components/ExamLink"
import { ExamPage } from "./ExamPage"

/**
 * A router segment definition for the Exam page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `ExamURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} ExamRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/exam/exam/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <ExamPage />.
 */
export const ExamRouterSegment = {
    path: `/${ExamURI}:id`,
    element: <ExamPage />,
}