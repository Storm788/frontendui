import { useParams } from "react-router"
import { TopicPageContentLazy } from "./TopicPageContentLazy"
import { TopicLiveEdit } from "../Components"

/**
 * TopicEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `topic`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/topic/:id`).
 * - Vytvoří objekt `topic` s tímto `id` a předává jej do komponenty `TopicPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `TopicPageContentLazy` vykresluje editační rozhraní pomocí `TopicLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `topic` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { topic: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `TopicPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (topic) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/topic/:id" element={<TopicEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/topic/:id"
 *   element={
 *     <TopicEditPage>
 *       {({ topic, onChange, onBlur }) => (
 *         <input value={topic.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </TopicEditPage>
 *   }
 * />
 */
export const TopicEditPage = ({children}) => {
    const {id} = useParams()
    const topic = {id}
    return (
        <TopicPageContentLazy topic={topic}>
            <TopicLiveEdit topic={topic} />
            {children}
        </TopicPageContentLazy>
    )
}