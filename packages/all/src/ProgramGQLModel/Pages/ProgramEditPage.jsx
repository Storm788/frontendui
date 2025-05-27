import { useParams } from "react-router"
import { ProgramPageContentLazy } from "./ProgramPageContentLazy"
import { ProgramLiveEdit } from "../Components"

/**
 * ProgramEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `program`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/program/:id`).
 * - Vytvoří objekt `program` s tímto `id` a předává jej do komponenty `ProgramPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `ProgramPageContentLazy` vykresluje editační rozhraní pomocí `ProgramLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `program` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { program: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `ProgramPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (program) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/program/:id" element={<ProgramEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/program/:id"
 *   element={
 *     <ProgramEditPage>
 *       {({ program, onChange, onBlur }) => (
 *         <input value={program.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramEditPage>
 *   }
 * />
 */
export const ProgramEditPage = ({children}) => {
    const {id} = useParams()
    const program = {id}
    return (
        <ProgramPageContentLazy program={program}>
            <ProgramLiveEdit program={program} />
            {children}
        </ProgramPageContentLazy>
    )
}