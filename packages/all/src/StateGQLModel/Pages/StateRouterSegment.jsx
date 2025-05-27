import { StateURI } from "../Components/StateLink"
import { StatePage } from "./StatePage"

/**
 * An array of route segment definitions for the State pages.
 *
 * Each route object in the array defines a `path` and its associated React `element`.
 * The `path` includes a dynamic `:id` parameter, used to load and display a specific state entity.
 * The `element` property specifies the React component to render when the route matches.
 *
 * Any React `children` elements passed through this route will be injected into the page and 
 * receive `state`, `onChange`, and `onBlur` as props from the `StatePageContentLazy` component.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // This route matches URLs like "/state/123":
 * {
 *   path: "/state/:id",
 *   element: <StatePage />
 * }
 */

export const StateRouterSegments = [
    {
        path: `/${StateURI}:id`,
        element: (<StatePage />),
    }
]