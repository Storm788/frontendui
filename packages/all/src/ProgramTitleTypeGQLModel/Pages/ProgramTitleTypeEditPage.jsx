import { useParams } from "react-router"
import { ProgramTitleTypePageContentLazy } from "./ProgramTitleTypePageContentLazy"
import { ProgramTitleTypeLiveEdit } from "../Components"

/**
 * ProgramTitleTypeEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `programtitletype`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/programtitletype/:id`).
 * - Vytvoří objekt `programtitletype` s tímto `id` a předává jej do komponenty `ProgramTitleTypePageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `ProgramTitleTypePageContentLazy` vykresluje editační rozhraní pomocí `ProgramTitleTypeLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `programtitletype` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { programtitletype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `ProgramTitleTypePageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (programtitletype) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/programtitletype/:id" element={<ProgramTitleTypeEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/programtitletype/:id"
 *   element={
 *     <ProgramTitleTypeEditPage>
 *       {({ programtitletype, onChange, onBlur }) => (
 *         <input value={programtitletype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramTitleTypeEditPage>
 *   }
 * />
 */
export const ProgramTitleTypeEditPage = ({children}) => {
    const {id} = useParams()
    const programtitletype = {id}
    return (
        <ProgramTitleTypePageContentLazy programtitletype={programtitletype}>
            <ProgramTitleTypeLiveEdit programtitletype={programtitletype} />
            {children}
        </ProgramTitleTypePageContentLazy>
    )
}