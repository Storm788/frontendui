import { EventURI } from "../Components/EventLink"
import { EventEditPage } from "./EventEditPage"
import { EventPage } from "./EventPage"
import { EventVectorPage } from "./EventVectorPage"

/**
 * Definice segmentů rout pro Event stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci event entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `event` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/event/123"
 * {
 *   path: "/event/:id",
 *   element: <EventPage />
 * }
 *
 * // Editační route: "/event/edit/123"
 * {
 *   path: "/event/edit/:id",
 *   element: <EventEditPage />
 * }
 */
export const EventRouterSegments = [
    {
        path: `/${EventURI}:id`,
        element: (<EventPage />),
    },
    {
        path: `/${EventURI}`,
        element: (<EventVectorPage />),
    },
    {
        path: `/${EventURI.replace('view', 'edit')}:id`,
        element: (<EventEditPage />),
    }
]