import { PaymentInfoURI } from "../Components/PaymentInfoLink"
import { PaymentInfoPage } from "./PaymentInfoPage"

/**
 * An array of route segment definitions for the PaymentInfo pages.
 *
 * Each route object in the array defines a `path` and its associated React `element`.
 * The `path` includes a dynamic `:id` parameter, used to load and display a specific paymentinfo entity.
 * The `element` property specifies the React component to render when the route matches.
 *
 * Any React `children` elements passed through this route will be injected into the page and 
 * receive `paymentinfo`, `onChange`, and `onBlur` as props from the `PaymentInfoPageContentLazy` component.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // This route matches URLs like "/paymentinfo/123":
 * {
 *   path: "/paymentinfo/:id",
 *   element: <PaymentInfoPage />
 * }
 */

export const PaymentInfoRouterSegments = [
    {
        path: `/${PaymentInfoURI}:id`,
        element: (<PaymentInfoPage />),
    }
]