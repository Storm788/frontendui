import { LessonURI } from "../Components/LessonLink"
import { LessonEditPage } from "./LessonEditPage"
import { LessonPage } from "./LessonPage"
import { LessonVectorPage } from "./LessonVectorPage"

/**
 * Definice segmentů rout pro Lesson stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci lesson entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `lesson` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/lesson/123"
 * {
 *   path: "/lesson/:id",
 *   element: <LessonPage />
 * }
 *
 * // Editační route: "/lesson/edit/123"
 * {
 *   path: "/lesson/edit/:id",
 *   element: <LessonEditPage />
 * }
 */
export const LessonRouterSegments = [
    {
        path: `/${LessonURI}:id`,
        element: (<LessonPage />),
    },
    {
        path: `/${LessonURI}`,
        element: (<LessonVectorPage />),
    },
    {
        path: `/${LessonURI.replace('view', 'edit')}:id`,
        element: (<LessonEditPage />),
    }
]