import { UserURI } from "../Components/UserLink"
import { UserEditPage } from "./UserEditPage"
import { UserPage } from "./UserPage"
import { UserVectorPage } from "./UserVectorPage"

/**
 * Definice segmentů rout pro User stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci user entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `user` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/user/123"
 * {
 *   path: "/user/:id",
 *   element: <UserPage />
 * }
 *
 * // Editační route: "/user/edit/123"
 * {
 *   path: "/user/edit/:id",
 *   element: <UserEditPage />
 * }
 */
export const UserRouterSegments = [
    {
        path: `/${UserURI}:id`,
        element: (<UserPage />),
    },
    {
        path: `/${UserURI}`,
        element: (<UserVectorPage />),
    },
    {
        path: `/${UserURI.replace('view', 'edit')}:id`,
        element: (<UserEditPage />),
    }
]