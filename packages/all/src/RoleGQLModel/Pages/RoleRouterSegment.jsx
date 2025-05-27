import { RoleURI } from "../Components/RoleLink"
import { RolePage } from "./RolePage"

/**
 * An array of route segment definitions for the Role pages.
 *
 * Each route object in the array defines a `path` and its associated React `element`.
 * The `path` includes a dynamic `:id` parameter, used to load and display a specific role entity.
 * The `element` property specifies the React component to render when the route matches.
 *
 * Any React `children` elements passed through this route will be injected into the page and 
 * receive `role`, `onChange`, and `onBlur` as props from the `RolePageContentLazy` component.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // This route matches URLs like "/role/123":
 * {
 *   path: "/role/:id",
 *   element: <RolePage />
 * }
 */

export const RoleRouterSegments = [
    {
        path: `/${RoleURI}:id`,
        element: (<RolePage />),
    }
]