import { useParams } from "react-router"
import { EventPageContentLazy } from "./EventPageContentLazy"
import { EventLiveEdit } from "../Components"

/**
 * EventEditPage Component
 *
 * Stránková komponenta pro lazy-loaded editaci entity `event`.
 *
 * - Získává `id` z URL parametrů pomocí `useParams` (např. `/event/:id`).
 * - Vytvoří objekt `event` s tímto `id` a předává jej do komponenty `EventPageContentLazy`,
 *   která se stará o asynchronní načtení dat z backendu.
 * - Uvnitř `EventPageContentLazy` vykresluje editační rozhraní pomocí `EventLiveEdit` a případně další obsah.
 *
 * Pokud předáš children jako render-funkci, ta obdrží:
 *   - `event` — kompletně načtený entity objekt,
 *   - `onChange` — callback pro změnu hodnoty pole,
 *   - `onBlur` — callback pro blur event (typicky při opuštění pole).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {(args: { event: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children]
 *   Volitelná render-funkce nebo prvek. Pokud je funkce, předá hodnoty z `EventPageContentLazy`.
 *
 * @returns {JSX.Element}
 *   Kompletní stránka pro lazy editaci šablony (event) podle ID z URL.
 *
 * @example
 * // Základní použití v routeru:
 * <Route path="/event/:id" element={<EventEditPage />} />
 *
 * @example
 * // Pokročilé použití s render-funkcí pro vlastní zobrazení obsahu:
 * <Route
 *   path="/event/:id"
 *   element={
 *     <EventEditPage>
 *       {({ event, onChange, onBlur }) => (
 *         <input value={event.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </EventEditPage>
 *   }
 * />
 */
export const EventEditPage = ({children}) => {
    const {id} = useParams()
    const event = {id}
    return (
        <EventPageContentLazy event={event}>
            <EventLiveEdit event={event} />
            {children}
        </EventPageContentLazy>
    )
}