import { useParams } from "react-router"
import { ProgramLanguageTypePageContentLazy } from "./ProgramLanguageTypePageContentLazy"
import { ProgramLanguageTypeLiveEdit } from "../Components"

/**
 * ProgramLanguageTypeEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `programlanguagetype`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/programlanguagetype/:id`).
 * - Vytvoří objekt `programlanguagetype` s tímto `id` a předává jej do komponenty `ProgramLanguageTypePageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `ProgramLanguageTypePageContentLazy` vykresluje editační rozhraní pomocí `ProgramLanguageTypeLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `programlanguagetype` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { programlanguagetype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `ProgramLanguageTypePageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (programlanguagetype) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/programlanguagetype/:id" element={<ProgramLanguageTypeEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/programlanguagetype/:id"
 *   element={
 *     <ProgramLanguageTypeEditPage>
 *       {({ programlanguagetype, onChange, onBlur }) => (
 *         <input value={programlanguagetype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramLanguageTypeEditPage>
 *   }
 * />
 */
export const ProgramLanguageTypeEditPage = ({children}) => {
    const {id} = useParams()
    const programlanguagetype = {id}
    return (
        <ProgramLanguageTypePageContentLazy programlanguagetype={programlanguagetype}>
            <ProgramLanguageTypeLiveEdit programlanguagetype={programlanguagetype} />
            {children}
        </ProgramLanguageTypePageContentLazy>
    )
}