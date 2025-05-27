import { useParams } from "react-router"
import { GroupPageContentLazy } from "./GroupPageContentLazy"
import { GroupLiveEdit } from "../Components"

/**
 * GroupEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `group`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/group/:id`).
 * - Vytvoří objekt `group` s tímto `id` a předává jej do komponenty `GroupPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `GroupPageContentLazy` vykresluje editační rozhraní pomocí `GroupLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `group` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { group: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `GroupPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (group) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/group/:id" element={<GroupEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/group/:id"
 *   element={
 *     <GroupEditPage>
 *       {({ group, onChange, onBlur }) => (
 *         <input value={group.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </GroupEditPage>
 *   }
 * />
 */
export const GroupEditPage = ({children}) => {
    const {id} = useParams()
    const group = {id}
    return (
        <GroupPageContentLazy group={group}>
            <GroupLiveEdit group={group} />
            {children}
        </GroupPageContentLazy>
    )
}