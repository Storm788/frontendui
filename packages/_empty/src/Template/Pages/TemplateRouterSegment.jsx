import { TemplateURI } from "../Components/TemplateLink"
import { TemplateEditPage } from "./TemplateEditPage"
import { TemplatePage } from "./TemplatePage"
import { TemplateVectorPage } from "./TemplateVectorPage"

/**
 * Definice segmentů rout pro Template stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci template entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `template` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/template/123"
 * {
 *   path: "/template/:id",
 *   element: <TemplatePage />
 * }
 *
 * // Editační route: "/template/edit/123"
 * {
 *   path: "/template/edit/:id",
 *   element: <TemplateEditPage />
 * }
 */
export const TemplateRouterSegments = [
    {
        path: `/${TemplateURI}:id`,
        element: (<TemplatePage />),
    },
    {
        path: `/${TemplateURI}`,
        element: (<TemplateVectorPage />),
    },
    {
        path: `/${TemplateURI.replace('view', 'edit')}:id`,
        element: (<TemplateEditPage />),
    }
]