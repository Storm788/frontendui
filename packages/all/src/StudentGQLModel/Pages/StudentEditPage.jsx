import { useParams } from "react-router"
import { StudentPageContentLazy } from "./StudentPageContentLazy"
import { StudentLiveEdit } from "../Components"

/**
 * StudentEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `student`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/student/:id`).
 * - Vytvoří objekt `student` s tímto `id` a předává jej do komponenty `StudentPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `StudentPageContentLazy` vykresluje editační rozhraní pomocí `StudentLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `student` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { student: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `StudentPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (student) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/student/:id" element={<StudentEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/student/:id"
 *   element={
 *     <StudentEditPage>
 *       {({ student, onChange, onBlur }) => (
 *         <input value={student.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StudentEditPage>
 *   }
 * />
 */
export const StudentEditPage = ({children}) => {
    const {id} = useParams()
    const student = {id}
    return (
        <StudentPageContentLazy student={student}>
            <StudentLiveEdit student={student} />
            {children}
        </StudentPageContentLazy>
    )
}