import { PaymentURI } from "../Components/PaymentLink"
import { PaymentPage } from "./PaymentPage"

/**
 * An array of route segment definitions for the Payment pages.
 *
 * Each route object in the array defines a `path` and its associated React `element`.
 * The `path` includes a dynamic `:id` parameter, used to load and display a specific payment entity.
 * The `element` property specifies the React component to render when the route matches.
 *
 * Any React `children` elements passed through this route will be injected into the page and 
 * receive `payment`, `onChange`, and `onBlur` as props from the `PaymentPageContentLazy` component.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // This route matches URLs like "/payment/123":
 * {
 *   path: "/payment/:id",
 *   element: <PaymentPage />
 * }
 */

export const PaymentRouterSegments = [
    {
        path: `/${PaymentURI}:id`,
        element: (<PaymentPage />),
    }
]