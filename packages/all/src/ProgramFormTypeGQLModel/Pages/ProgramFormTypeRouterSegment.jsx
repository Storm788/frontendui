import { ProgramFormTypeURI } from "../Components/ProgramFormTypeLink"
import { ProgramFormTypeEditPage } from "./ProgramFormTypeEditPage"
import { ProgramFormTypePage } from "./ProgramFormTypePage"
import { ProgramFormTypeVectorPage } from "./ProgramFormTypeVectorPage"

/**
 * Definice segmentů rout pro ProgramFormType stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci programformtype entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `programformtype` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/programformtype/123"
 * {
 *   path: "/programformtype/:id",
 *   element: <ProgramFormTypePage />
 * }
 *
 * // Editační route: "/programformtype/edit/123"
 * {
 *   path: "/programformtype/edit/:id",
 *   element: <ProgramFormTypeEditPage />
 * }
 */
export const ProgramFormTypeRouterSegments = [
    {
        path: `/${ProgramFormTypeURI}:id`,
        element: (<ProgramFormTypePage />),
    },
    {
        path: `/${ProgramFormTypeURI}`,
        element: (<ProgramFormTypeVectorPage />),
    },
    {
        path: `/${ProgramFormTypeURI.replace('view', 'edit')}:id`,
        element: (<ProgramFormTypeEditPage />),
    }
]