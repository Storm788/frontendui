import { useParams } from "react-router"
import { StudyPlanPageContentLazy } from "./StudyPlanPageContentLazy"
import { StudyPlanLiveEdit } from "../Components"

/**
 * StudyPlanEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `studyplan`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/studyplan/:id`).
 * - Vytvoří objekt `studyplan` s tímto `id` a předává jej do komponenty `StudyPlanPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `StudyPlanPageContentLazy` vykresluje editační rozhraní pomocí `StudyPlanLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `studyplan` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { studyplan: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `StudyPlanPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (studyplan) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/studyplan/:id" element={<StudyPlanEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/studyplan/:id"
 *   element={
 *     <StudyPlanEditPage>
 *       {({ studyplan, onChange, onBlur }) => (
 *         <input value={studyplan.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StudyPlanEditPage>
 *   }
 * />
 */
export const StudyPlanEditPage = ({children}) => {
    const {id} = useParams()
    const studyplan = {id}
    return (
        <StudyPlanPageContentLazy studyplan={studyplan}>
            <StudyPlanLiveEdit studyplan={studyplan} />
            {children}
        </StudyPlanPageContentLazy>
    )
}