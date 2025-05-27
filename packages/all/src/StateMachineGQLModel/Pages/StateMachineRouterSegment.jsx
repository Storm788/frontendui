import { StateMachineURI } from "../Components/StateMachineLink"
import { StateMachinePage } from "./StateMachinePage"

/**
 * An array of route segment definitions for the StateMachine pages.
 *
 * Each route object in the array defines a `path` and its associated React `element`.
 * The `path` includes a dynamic `:id` parameter, used to load and display a specific statemachine entity.
 * The `element` property specifies the React component to render when the route matches.
 *
 * Any React `children` elements passed through this route will be injected into the page and 
 * receive `statemachine`, `onChange`, and `onBlur` as props from the `StateMachinePageContentLazy` component.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // This route matches URLs like "/statemachine/123":
 * {
 *   path: "/statemachine/:id",
 *   element: <StateMachinePage />
 * }
 */

export const StateMachineRouterSegments = [
    {
        path: `/${StateMachineURI}:id`,
        element: (<StateMachinePage />),
    }
]