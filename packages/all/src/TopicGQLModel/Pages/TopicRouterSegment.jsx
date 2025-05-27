import { TopicURI } from "../Components/TopicLink"
import { TopicEditPage } from "./TopicEditPage"
import { TopicPage } from "./TopicPage"
import { TopicVectorPage } from "./TopicVectorPage"

/**
 * Definice segmentů rout pro Topic stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci topic entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `topic` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/topic/123"
 * {
 *   path: "/topic/:id",
 *   element: <TopicPage />
 * }
 *
 * // Editační route: "/topic/edit/123"
 * {
 *   path: "/topic/edit/:id",
 *   element: <TopicEditPage />
 * }
 */
export const TopicRouterSegments = [
    {
        path: `/${TopicURI}:id`,
        element: (<TopicPage />),
    },
    {
        path: `/${TopicURI}`,
        element: (<TopicVectorPage />),
    },
    {
        path: `/${TopicURI.replace('view', 'edit')}:id`,
        element: (<TopicEditPage />),
    }
]