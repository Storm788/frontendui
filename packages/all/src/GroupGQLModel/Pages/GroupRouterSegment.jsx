import { GroupURI } from "../Components/GroupLink"
import { GroupEditPage } from "./GroupEditPage"
import { GroupPage } from "./GroupPage"
import { GroupVectorPage } from "./GroupVectorPage"

/**
 * Definice segmentů rout pro Group stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci group entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `group` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/group/123"
 * {
 *   path: "/group/:id",
 *   element: <GroupPage />
 * }
 *
 * // Editační route: "/group/edit/123"
 * {
 *   path: "/group/edit/:id",
 *   element: <GroupEditPage />
 * }
 */
export const GroupRouterSegments = [
    {
        path: `/${GroupURI}:id`,
        element: (<GroupPage />),
    },
    {
        path: `/${GroupURI}`,
        element: (<GroupVectorPage />),
    },
    {
        path: `/${GroupURI.replace('view', 'edit')}:id`,
        element: (<GroupEditPage />),
    }
]