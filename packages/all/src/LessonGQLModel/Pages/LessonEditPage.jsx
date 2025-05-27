import { useParams } from "react-router"
import { LessonPageContentLazy } from "./LessonPageContentLazy"
import { LessonLiveEdit } from "../Components"

/**
 * LessonEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `lesson`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/lesson/:id`).
 * - Vytvoří objekt `lesson` s tímto `id` a předává jej do komponenty `LessonPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `LessonPageContentLazy` vykresluje editační rozhraní pomocí `LessonLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `lesson` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { lesson: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `LessonPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (lesson) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/lesson/:id" element={<LessonEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/lesson/:id"
 *   element={
 *     <LessonEditPage>
 *       {({ lesson, onChange, onBlur }) => (
 *         <input value={lesson.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </LessonEditPage>
 *   }
 * />
 */
export const LessonEditPage = ({children}) => {
    const {id} = useParams()
    const lesson = {id}
    return (
        <LessonPageContentLazy lesson={lesson}>
            <LessonLiveEdit lesson={lesson} />
            {children}
        </LessonPageContentLazy>
    )
}