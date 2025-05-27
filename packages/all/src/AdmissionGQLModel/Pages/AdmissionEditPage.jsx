import { useParams } from "react-router"
import { AdmissionPageContentLazy } from "./AdmissionPageContentLazy"
import { AdmissionLiveEdit } from "../Components"

/**
 * AdmissionEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `admission`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/admission/:id`).
 * - Vytvoří objekt `admission` s tímto `id` a předává jej do komponenty `AdmissionPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `AdmissionPageContentLazy` vykresluje editační rozhraní pomocí `AdmissionLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `admission` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { admission: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `AdmissionPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (admission) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/admission/:id" element={<AdmissionEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/admission/:id"
 *   element={
 *     <AdmissionEditPage>
 *       {({ admission, onChange, onBlur }) => (
 *         <input value={admission.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </AdmissionEditPage>
 *   }
 * />
 */
export const AdmissionEditPage = ({children}) => {
    const {id} = useParams()
    const admission = {id}
    return (
        <AdmissionPageContentLazy admission={admission}>
            <AdmissionLiveEdit admission={admission} />
            {children}
        </AdmissionPageContentLazy>
    )
}