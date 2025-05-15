import { EvaluationURI } from "../Components/EvaluationLink"
import { EvaluationPage } from "./EvaluationPage"

/**
 * A router segment definition for the Evaluation page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `EvaluationURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} EvaluationRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/evaluation/evaluation/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <EvaluationPage />.
 */
export const EvaluationRouterSegment = {
    path: `/${EvaluationURI}/:id`,
    element: <EvaluationPage />,
}