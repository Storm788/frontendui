import { ProgramTypeURI } from "../Components/ProgramTypeLink"
import { ProgramTypeEditPage } from "./ProgramTypeEditPage"
import { ProgramTypePage } from "./ProgramTypePage"
import { ProgramTypeVectorPage } from "./ProgramTypeVectorPage"

/**
 * Definice segmentů rout pro ProgramType stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci programtype entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `programtype` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/programtype/123"
 * {
 *   path: "/programtype/:id",
 *   element: <ProgramTypePage />
 * }
 *
 * // Editační route: "/programtype/edit/123"
 * {
 *   path: "/programtype/edit/:id",
 *   element: <ProgramTypeEditPage />
 * }
 */
export const ProgramTypeRouterSegments = [
    {
        path: `/${ProgramTypeURI}:id`,
        element: (<ProgramTypePage />),
    },
    {
        path: `/${ProgramTypeURI}`,
        element: (<ProgramTypeVectorPage />),
    },
    {
        path: `/${ProgramTypeURI.replace('view', 'edit')}:id`,
        element: (<ProgramTypeEditPage />),
    }
]