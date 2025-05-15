import { AdmissionURI } from "../Components/AdmissionLink"
import { AdmissionPage } from "./AdmissionPage"

/**
 * A router segment definition for the Admission page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `AdmissionURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} AdmissionRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/admission/admission/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <AdmissionPage />.
 */
export const AdmissionRouterSegment = {
    path: `/${AdmissionURI}:id`,
    element: <AdmissionPage />,
}