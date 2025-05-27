import { StudyPlanURI } from "../Components/StudyPlanLink"
import { StudyPlanEditPage } from "./StudyPlanEditPage"
import { StudyPlanPage } from "./StudyPlanPage"
import { StudyPlanVectorPage } from "./StudyPlanVectorPage"

/**
 * Definice segmentů rout pro StudyPlan stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci studyplan entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `studyplan` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/studyplan/123"
 * {
 *   path: "/studyplan/:id",
 *   element: <StudyPlanPage />
 * }
 *
 * // Editační route: "/studyplan/edit/123"
 * {
 *   path: "/studyplan/edit/:id",
 *   element: <StudyPlanEditPage />
 * }
 */
export const StudyPlanRouterSegments = [
    {
        path: `/${StudyPlanURI}:id`,
        element: (<StudyPlanPage />),
    },
    {
        path: `/${StudyPlanURI}`,
        element: (<StudyPlanVectorPage />),
    },
    {
        path: `/${StudyPlanURI.replace('view', 'edit')}:id`,
        element: (<StudyPlanEditPage />),
    }
]