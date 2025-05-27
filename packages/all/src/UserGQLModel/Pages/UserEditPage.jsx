import { useParams } from "react-router"
import { UserPageContentLazy } from "./UserPageContentLazy"
import { UserLiveEdit } from "../Components"

/**
 * UserEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `user`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/user/:id`).
 * - Vytvoří objekt `user` s tímto `id` a předává jej do komponenty `UserPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `UserPageContentLazy` vykresluje editační rozhraní pomocí `UserLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `user` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { user: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `UserPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (user) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/user/:id" element={<UserEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/user/:id"
 *   element={
 *     <UserEditPage>
 *       {({ user, onChange, onBlur }) => (
 *         <input value={user.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </UserEditPage>
 *   }
 * />
 */
export const UserEditPage = ({children}) => {
    const {id} = useParams()
    const user = {id}
    return (
        <UserPageContentLazy user={user}>
            <UserLiveEdit user={user} />
            {children}
        </UserPageContentLazy>
    )
}