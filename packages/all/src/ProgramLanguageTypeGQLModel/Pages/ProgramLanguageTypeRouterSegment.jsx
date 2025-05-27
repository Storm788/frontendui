import { ProgramLanguageTypeURI } from "../Components/ProgramLanguageTypeLink"
import { ProgramLanguageTypeEditPage } from "./ProgramLanguageTypeEditPage"
import { ProgramLanguageTypePage } from "./ProgramLanguageTypePage"
import { ProgramLanguageTypeVectorPage } from "./ProgramLanguageTypeVectorPage"

/**
 * Definice segmentů rout pro ProgramLanguageType stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci programlanguagetype entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `programlanguagetype` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/programlanguagetype/123"
 * {
 *   path: "/programlanguagetype/:id",
 *   element: <ProgramLanguageTypePage />
 * }
 *
 * // Editační route: "/programlanguagetype/edit/123"
 * {
 *   path: "/programlanguagetype/edit/:id",
 *   element: <ProgramLanguageTypeEditPage />
 * }
 */
export const ProgramLanguageTypeRouterSegments = [
    {
        path: `/${ProgramLanguageTypeURI}:id`,
        element: (<ProgramLanguageTypePage />),
    },
    {
        path: `/${ProgramLanguageTypeURI}`,
        element: (<ProgramLanguageTypeVectorPage />),
    },
    {
        path: `/${ProgramLanguageTypeURI.replace('view', 'edit')}:id`,
        element: (<ProgramLanguageTypeEditPage />),
    }
]