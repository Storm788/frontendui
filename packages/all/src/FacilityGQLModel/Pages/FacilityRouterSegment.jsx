import { FacilityURI } from "../Components/FacilityLink"
import { FacilityEditPage } from "./FacilityEditPage"
import { FacilityPage } from "./FacilityPage"
import { FacilityVectorPage } from "./FacilityVectorPage"

/**
 * Definice segmentů rout pro Facility stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci facility entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `facility` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/facility/123"
 * {
 *   path: "/facility/:id",
 *   element: <FacilityPage />
 * }
 *
 * // Editační route: "/facility/edit/123"
 * {
 *   path: "/facility/edit/:id",
 *   element: <FacilityEditPage />
 * }
 */
export const FacilityRouterSegments = [
    {
        path: `/${FacilityURI}:id`,
        element: (<FacilityPage />),
    },
    {
        path: `/${FacilityURI}`,
        element: (<FacilityVectorPage />),
    },
    {
        path: `/${FacilityURI.replace('view', 'edit')}:id`,
        element: (<FacilityEditPage />),
    }
]