import { StudyPlanLessonURI } from "../Components/StudyPlanLessonLink"
import { StudyPlanLessonEditPage } from "./StudyPlanLessonEditPage"
import { StudyPlanLessonPage } from "./StudyPlanLessonPage"
import { StudyPlanLessonVectorPage } from "./StudyPlanLessonVectorPage"

/**
 * Definice segmentů rout pro StudyPlanLesson stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci studyplanlesson entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `studyplanlesson` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/studyplanlesson/123"
 * {
 *   path: "/studyplanlesson/:id",
 *   element: <StudyPlanLessonPage />
 * }
 *
 * // Editační route: "/studyplanlesson/edit/123"
 * {
 *   path: "/studyplanlesson/edit/:id",
 *   element: <StudyPlanLessonEditPage />
 * }
 */
export const StudyPlanLessonRouterSegments = [
    {
        path: `/${StudyPlanLessonURI}:id`,
        element: (<StudyPlanLessonPage />),
    },
    {
        path: `/${StudyPlanLessonURI}`,
        element: (<StudyPlanLessonVectorPage />),
    },
    {
        path: `/${StudyPlanLessonURI.replace('view', 'edit')}:id`,
        element: (<StudyPlanLessonEditPage />),
    }
]