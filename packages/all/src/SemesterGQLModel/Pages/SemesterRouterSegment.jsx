import { SemesterURI } from "../Components/SemesterLink"
import { SemesterEditPage } from "./SemesterEditPage"
import { SemesterPage } from "./SemesterPage"
import { SemesterVectorPage } from "./SemesterVectorPage"

/**
 * Definice segmentů rout pro Semester stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci semester entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `semester` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/semester/123"
 * {
 *   path: "/semester/:id",
 *   element: <SemesterPage />
 * }
 *
 * // Editační route: "/semester/edit/123"
 * {
 *   path: "/semester/edit/:id",
 *   element: <SemesterEditPage />
 * }
 */
export const SemesterRouterSegments = [
    {
        path: `/${SemesterURI}:id`,
        element: (<SemesterPage />),
    },
    {
        path: `/${SemesterURI}`,
        element: (<SemesterVectorPage />),
    },
    {
        path: `/${SemesterURI.replace('view', 'edit')}:id`,
        element: (<SemesterEditPage />),
    }
]