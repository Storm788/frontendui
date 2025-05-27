import { SubjectURI } from "../Components/SubjectLink"
import { SubjectEditPage } from "./SubjectEditPage"
import { SubjectPage } from "./SubjectPage"
import { SubjectVectorPage } from "./SubjectVectorPage"

/**
 * Definice segmentů rout pro Subject stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci subject entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `subject` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/subject/123"
 * {
 *   path: "/subject/:id",
 *   element: <SubjectPage />
 * }
 *
 * // Editační route: "/subject/edit/123"
 * {
 *   path: "/subject/edit/:id",
 *   element: <SubjectEditPage />
 * }
 */
export const SubjectRouterSegments = [
    {
        path: `/${SubjectURI}:id`,
        element: (<SubjectPage />),
    },
    {
        path: `/${SubjectURI}`,
        element: (<SubjectVectorPage />),
    },
    {
        path: `/${SubjectURI.replace('view', 'edit')}:id`,
        element: (<SubjectEditPage />),
    }
]