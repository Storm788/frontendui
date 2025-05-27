import { useParams } from "react-router"
import { ProgramTypePageContentLazy } from "./ProgramTypePageContentLazy"
import { ProgramTypeLiveEdit } from "../Components"

/**
 * ProgramTypeEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `programtype`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/programtype/:id`).
 * - Vytvoří objekt `programtype` s tímto `id` a předává jej do komponenty `ProgramTypePageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `ProgramTypePageContentLazy` vykresluje editační rozhraní pomocí `ProgramTypeLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `programtype` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { programtype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `ProgramTypePageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (programtype) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/programtype/:id" element={<ProgramTypeEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/programtype/:id"
 *   element={
 *     <ProgramTypeEditPage>
 *       {({ programtype, onChange, onBlur }) => (
 *         <input value={programtype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramTypeEditPage>
 *   }
 * />
 */
export const ProgramTypeEditPage = ({children}) => {
    const {id} = useParams()
    const programtype = {id}
    return (
        <ProgramTypePageContentLazy programtype={programtype}>
            <ProgramTypeLiveEdit programtype={programtype} />
            {children}
        </ProgramTypePageContentLazy>
    )
}