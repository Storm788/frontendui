import { useParams } from "react-router"
import { SemesterPageContentLazy } from "./SemesterPageContentLazy"
import { SemesterLiveEdit } from "../Components"

/**
 * SemesterEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `semester`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/semester/:id`).
 * - Vytvoří objekt `semester` s tímto `id` a předává jej do komponenty `SemesterPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `SemesterPageContentLazy` vykresluje editační rozhraní pomocí `SemesterLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `semester` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { semester: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `SemesterPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (semester) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/semester/:id" element={<SemesterEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/semester/:id"
 *   element={
 *     <SemesterEditPage>
 *       {({ semester, onChange, onBlur }) => (
 *         <input value={semester.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </SemesterEditPage>
 *   }
 * />
 */
export const SemesterEditPage = ({children}) => {
    const {id} = useParams()
    const semester = {id}
    return (
        <SemesterPageContentLazy semester={semester}>
            <SemesterLiveEdit semester={semester} />
            {children}
        </SemesterPageContentLazy>
    )
}