import { StateTransitionURI } from "../Components/StateTransitionLink"
import { StateTransitionPage } from "./StateTransitionPage"

/**
 * An array of route segment definitions for the StateTransition pages.
 *
 * Each route object in the array defines a `path` and its associated React `element`.
 * The `path` includes a dynamic `:id` parameter, used to load and display a specific statetransition entity.
 * The `element` property specifies the React component to render when the route matches.
 *
 * Any React `children` elements passed through this route will be injected into the page and 
 * receive `statetransition`, `onChange`, and `onBlur` as props from the `StateTransitionPageContentLazy` component.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // This route matches URLs like "/statetransition/123":
 * {
 *   path: "/statetransition/:id",
 *   element: <StateTransitionPage />
 * }
 */

export const StateTransitionRouterSegments = [
    {
        path: `/${StateTransitionURI}:id`,
        element: (<StateTransitionPage />),
    }
]