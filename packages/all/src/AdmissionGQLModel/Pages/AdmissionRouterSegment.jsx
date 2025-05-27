import { AdmissionURI } from "../Components/AdmissionLink"
import { AdmissionEditPage } from "./AdmissionEditPage"
import { AdmissionPage } from "./AdmissionPage"
import { AdmissionVectorPage } from "./AdmissionVectorPage"

/**
 * Definice segmentů rout pro Admission stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci admission entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `admission` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/admission/123"
 * {
 *   path: "/admission/:id",
 *   element: <AdmissionPage />
 * }
 *
 * // Editační route: "/admission/edit/123"
 * {
 *   path: "/admission/edit/:id",
 *   element: <AdmissionEditPage />
 * }
 */
export const AdmissionRouterSegments = [
    {
        path: `/${AdmissionURI}:id`,
        element: (<AdmissionPage />),
    },
    {
        path: `/${AdmissionURI}`,
        element: (<AdmissionVectorPage />),
    },
    {
        path: `/${AdmissionURI.replace('view', 'edit')}:id`,
        element: (<AdmissionEditPage />),
    }
]