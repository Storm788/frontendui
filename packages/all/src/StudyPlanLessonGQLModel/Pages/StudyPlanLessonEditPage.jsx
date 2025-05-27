import { useParams } from "react-router"
import { StudyPlanLessonPageContentLazy } from "./StudyPlanLessonPageContentLazy"
import { StudyPlanLessonLiveEdit } from "../Components"

/**
 * StudyPlanLessonEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `studyplanlesson`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/studyplanlesson/:id`).
 * - Vytvoří objekt `studyplanlesson` s tímto `id` a předává jej do komponenty `StudyPlanLessonPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `StudyPlanLessonPageContentLazy` vykresluje editační rozhraní pomocí `StudyPlanLessonLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `studyplanlesson` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { studyplanlesson: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `StudyPlanLessonPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (studyplanlesson) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/studyplanlesson/:id" element={<StudyPlanLessonEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/studyplanlesson/:id"
 *   element={
 *     <StudyPlanLessonEditPage>
 *       {({ studyplanlesson, onChange, onBlur }) => (
 *         <input value={studyplanlesson.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StudyPlanLessonEditPage>
 *   }
 * />
 */
export const StudyPlanLessonEditPage = ({children}) => {
    const {id} = useParams()
    const studyplanlesson = {id}
    return (
        <StudyPlanLessonPageContentLazy studyplanlesson={studyplanlesson}>
            <StudyPlanLessonLiveEdit studyplanlesson={studyplanlesson} />
            {children}
        </StudyPlanLessonPageContentLazy>
    )
}