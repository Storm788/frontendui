import { useParams } from "react-router"
import { ProgramFormTypePageContentLazy } from "./ProgramFormTypePageContentLazy"
import { ProgramFormTypeLiveEdit } from "../Components"

/**
 * ProgramFormTypeEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `programformtype`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/programformtype/:id`).
 * - Vytvoří objekt `programformtype` s tímto `id` a předává jej do komponenty `ProgramFormTypePageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `ProgramFormTypePageContentLazy` vykresluje editační rozhraní pomocí `ProgramFormTypeLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `programformtype` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { programformtype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `ProgramFormTypePageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (programformtype) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/programformtype/:id" element={<ProgramFormTypeEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/programformtype/:id"
 *   element={
 *     <ProgramFormTypeEditPage>
 *       {({ programformtype, onChange, onBlur }) => (
 *         <input value={programformtype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramFormTypeEditPage>
 *   }
 * />
 */
export const ProgramFormTypeEditPage = ({children}) => {
    const {id} = useParams()
    const programformtype = {id}
    return (
        <ProgramFormTypePageContentLazy programformtype={programformtype}>
            <ProgramFormTypeLiveEdit programformtype={programformtype} />
            {children}
        </ProgramFormTypePageContentLazy>
    )
}