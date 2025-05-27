import { HashContainer } from "@hrbolek/uoisfrontend-shared"
import { ProgramURI } from "../Components/ProgramLink"
import { ProgramStudentsAttributeLazy } from "../Vectors/ProgramStudentsAttribute"
import { ProgramSubjectsAttributeLazy } from "../Vectors/ProgramSubjectsAttribute"
import { ProgramPage } from "./ProgramPage"
import { ProgramCardCapsule } from "../Components"

/**
 * An array of route segment definitions for the Program pages.
 *
 * Each route object in the array defines a `path` and its associated React `element`.
 * The `path` includes a dynamic `:id` parameter, used to load and display a specific program entity.
 * The `element` property specifies the React component to render when the route matches.
 *
 * Any React `children` elements passed through this route will be injected into the page and 
 * receive `program`, `onChange`, and `onBlur` as props from the `ProgramPageContentLazy` component.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // This route matches URLs like "/program/123":
 * {
 *   path: "/program/:id",
 *   element: <ProgramPage />
 * }
 */

export const ProgramRouterSegments = [
    {
        path: `/${ProgramURI}:id`,
        element: (<ProgramPage>

        </ProgramPage>),
    },
    {
        path: `/${ProgramURI.replace('view', 'subjects')}:id/`,
        element: (<ProgramPage>
            <ProgramSubjectsAttributeLazy />
        </ProgramPage>)
    },
    {
        path: `/${ProgramURI.replace('view', 'students')}:id/`,
        element: (<ProgramPage>
            <ProgramStudentsAttributeLazy />
        </ProgramPage>)
    }




]