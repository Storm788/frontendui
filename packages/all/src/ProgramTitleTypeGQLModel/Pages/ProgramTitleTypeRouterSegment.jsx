import { ProgramTitleTypeURI } from "../Components/ProgramTitleTypeLink"
import { ProgramTitleTypeEditPage } from "./ProgramTitleTypeEditPage"
import { ProgramTitleTypePage } from "./ProgramTitleTypePage"
import { ProgramTitleTypeVectorPage } from "./ProgramTitleTypeVectorPage"

/**
 * Definice segmentů rout pro ProgramTitleType stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci programtitletype entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `programtitletype` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/programtitletype/123"
 * {
 *   path: "/programtitletype/:id",
 *   element: <ProgramTitleTypePage />
 * }
 *
 * // Editační route: "/programtitletype/edit/123"
 * {
 *   path: "/programtitletype/edit/:id",
 *   element: <ProgramTitleTypeEditPage />
 * }
 */
export const ProgramTitleTypeRouterSegments = [
    {
        path: `/${ProgramTitleTypeURI}:id`,
        element: (<ProgramTitleTypePage />),
    },
    {
        path: `/${ProgramTitleTypeURI}`,
        element: (<ProgramTitleTypeVectorPage />),
    },
    {
        path: `/${ProgramTitleTypeURI.replace('view', 'edit')}:id`,
        element: (<ProgramTitleTypeEditPage />),
    }
]