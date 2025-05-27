import { useParams } from "react-router"
import { EventPageContentLazy } from "./EventPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a event entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `event` object, and passes it to the `EventPageContentLazy` component.
 * The `EventPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `event`: the fetched event entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { event: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `EventPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the event entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/event/:id" element={<EventPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/event/:id"
 *   element={
 *     <EventPage>
 *       {({ event, onChange, onBlur }) => (
 *         <input value={event.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </EventPage>
 *   }
 * />
 */

export const EventPage = ({children}) => {
    const {id} = useParams()
    const event = {id}
    return (
        <EventPageContentLazy event={event}>
            {children}
        </EventPageContentLazy>
    )
}