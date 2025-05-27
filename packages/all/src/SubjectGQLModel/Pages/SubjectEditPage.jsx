import { useParams } from "react-router"
import { SubjectPageContentLazy } from "./SubjectPageContentLazy"
import { SubjectLiveEdit } from "../Components"

/**
 * SubjectEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `subject`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/subject/:id`).
 * - Vytvoří objekt `subject` s tímto `id` a předává jej do komponenty `SubjectPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `SubjectPageContentLazy` vykresluje editační rozhraní pomocí `SubjectLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `subject` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { subject: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `SubjectPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (subject) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/subject/:id" element={<SubjectEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/subject/:id"
 *   element={
 *     <SubjectEditPage>
 *       {({ subject, onChange, onBlur }) => (
 *         <input value={subject.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </SubjectEditPage>
 *   }
 * />
 */
export const SubjectEditPage = ({children}) => {
    const {id} = useParams()
    const subject = {id}
    return (
        <SubjectPageContentLazy subject={subject}>
            <SubjectLiveEdit subject={subject} />
            {children}
        </SubjectPageContentLazy>
    )
}