import { LessonTypeURI } from "../Components/LessonTypeLink"
import { LessonTypeEditPage } from "./LessonTypeEditPage"
import { LessonTypePage } from "./LessonTypePage"
import { LessonTypeVectorPage } from "./LessonTypeVectorPage"

/**
 * Definice segmentů rout pro LessonType stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci lessontype entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `lessontype` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/lessontype/123"
 * {
 *   path: "/lessontype/:id",
 *   element: <LessonTypePage />
 * }
 *
 * // Editační route: "/lessontype/edit/123"
 * {
 *   path: "/lessontype/edit/:id",
 *   element: <LessonTypeEditPage />
 * }
 */
export const LessonTypeRouterSegments = [
    {
        path: `/${LessonTypeURI}:id`,
        element: (<LessonTypePage />),
    },
    {
        path: `/${LessonTypeURI}`,
        element: (<LessonTypeVectorPage />),
    },
    {
        path: `/${LessonTypeURI.replace('view', 'edit')}:id`,
        element: (<LessonTypeEditPage />),
    }
]