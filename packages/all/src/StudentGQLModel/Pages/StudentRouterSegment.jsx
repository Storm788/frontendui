import { StudentURI } from "../Components/StudentLink"
import { StudentEditPage } from "./StudentEditPage"
import { StudentPage } from "./StudentPage"
import { StudentVectorPage } from "./StudentVectorPage"

/**
 * Definice segmentů rout pro Student stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci student entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `student` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/student/123"
 * {
 *   path: "/student/:id",
 *   element: <StudentPage />
 * }
 *
 * // Editační route: "/student/edit/123"
 * {
 *   path: "/student/edit/:id",
 *   element: <StudentEditPage />
 * }
 */
export const StudentRouterSegments = [
    {
        path: `/${StudentURI}:id`,
        element: (<StudentPage />),
    },
    {
        path: `/${StudentURI}`,
        element: (<StudentVectorPage />),
    },
    {
        path: `/${StudentURI.replace('view', 'edit')}:id`,
        element: (<StudentEditPage />),
    }
]