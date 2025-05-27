import { useParams } from "react-router"
import { FacilityPageContentLazy } from "./FacilityPageContentLazy"
import { FacilityLiveEdit } from "../Components"

/**
 * FacilityEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `facility`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/facility/:id`).
 * - Vytvoří objekt `facility` s tímto `id` a předává jej do komponenty `FacilityPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `FacilityPageContentLazy` vykresluje editační rozhraní pomocí `FacilityLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `facility` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { facility: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `FacilityPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (facility) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/facility/:id" element={<FacilityEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/facility/:id"
 *   element={
 *     <FacilityEditPage>
 *       {({ facility, onChange, onBlur }) => (
 *         <input value={facility.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </FacilityEditPage>
 *   }
 * />
 */
export const FacilityEditPage = ({children}) => {
    const {id} = useParams()
    const facility = {id}
    return (
        <FacilityPageContentLazy facility={facility}>
            <FacilityLiveEdit facility={facility} />
            {children}
        </FacilityPageContentLazy>
    )
}