import { useParams } from "react-router"
import { ProgramLevelTypePageContentLazy } from "./ProgramLevelTypePageContentLazy"
import { ProgramLevelTypeLiveEdit } from "../Components"

/**
 * ProgramLevelTypeEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `programleveltype`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/programleveltype/:id`).
 * - Vytvoří objekt `programleveltype` s tímto `id` a předává jej do komponenty `ProgramLevelTypePageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `ProgramLevelTypePageContentLazy` vykresluje editační rozhraní pomocí `ProgramLevelTypeLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `programleveltype` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { programleveltype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `ProgramLevelTypePageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (programleveltype) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/programleveltype/:id" element={<ProgramLevelTypeEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/programleveltype/:id"
 *   element={
 *     <ProgramLevelTypeEditPage>
 *       {({ programleveltype, onChange, onBlur }) => (
 *         <input value={programleveltype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramLevelTypeEditPage>
 *   }
 * />
 */
export const ProgramLevelTypeEditPage = ({children}) => {
    const {id} = useParams()
    const programleveltype = {id}
    return (
        <ProgramLevelTypePageContentLazy programleveltype={programleveltype}>
            <ProgramLevelTypeLiveEdit programleveltype={programleveltype} />
            {children}
        </ProgramLevelTypePageContentLazy>
    )
}