import { useParams } from "react-router"
import { LessonTypePageContentLazy } from "./LessonTypePageContentLazy"
import { LessonTypeLiveEdit } from "../Components"

/**
 * LessonTypeEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `lessontype`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/lessontype/:id`).
 * - Vytvoří objekt `lessontype` s tímto `id` a předává jej do komponenty `LessonTypePageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `LessonTypePageContentLazy` vykresluje editační rozhraní pomocí `LessonTypeLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `lessontype` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { lessontype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `LessonTypePageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (lessontype) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/lessontype/:id" element={<LessonTypeEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/lessontype/:id"
 *   element={
 *     <LessonTypeEditPage>
 *       {({ lessontype, onChange, onBlur }) => (
 *         <input value={lessontype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </LessonTypeEditPage>
 *   }
 * />
 */
export const LessonTypeEditPage = ({children}) => {
    const {id} = useParams()
    const lessontype = {id}
    return (
        <LessonTypePageContentLazy lessontype={lessontype}>
            <LessonTypeLiveEdit lessontype={lessontype} />
            {children}
        </LessonTypePageContentLazy>
    )
}