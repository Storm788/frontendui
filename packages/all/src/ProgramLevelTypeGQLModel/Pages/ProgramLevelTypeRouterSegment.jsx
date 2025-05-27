import { ProgramLevelTypeURI } from "../Components/ProgramLevelTypeLink"
import { ProgramLevelTypeEditPage } from "./ProgramLevelTypeEditPage"
import { ProgramLevelTypePage } from "./ProgramLevelTypePage"
import { ProgramLevelTypeVectorPage } from "./ProgramLevelTypeVectorPage"

/**
 * Definice segmentů rout pro ProgramLevelType stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci programleveltype entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `programleveltype` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/programleveltype/123"
 * {
 *   path: "/programleveltype/:id",
 *   element: <ProgramLevelTypePage />
 * }
 *
 * // Editační route: "/programleveltype/edit/123"
 * {
 *   path: "/programleveltype/edit/:id",
 *   element: <ProgramLevelTypeEditPage />
 * }
 */
export const ProgramLevelTypeRouterSegments = [
    {
        path: `/${ProgramLevelTypeURI}:id`,
        element: (<ProgramLevelTypePage />),
    },
    {
        path: `/${ProgramLevelTypeURI}`,
        element: (<ProgramLevelTypeVectorPage />),
    },
    {
        path: `/${ProgramLevelTypeURI.replace('view', 'edit')}:id`,
        element: (<ProgramLevelTypeEditPage />),
    }
]