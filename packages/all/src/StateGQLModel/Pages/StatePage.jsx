import { useParams } from "react-router"
import { StatePageContentLazy } from "./StatePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a state entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `state` object, and passes it to the `StatePageContentLazy` component.
 * The `StatePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `state`: the fetched state entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { state: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `StatePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the state entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/state/:id" element={<StatePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/state/:id"
 *   element={
 *     <StatePage>
 *       {({ state, onChange, onBlur }) => (
 *         <input value={state.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StatePage>
 *   }
 * />
 */

export const StatePage = ({children}) => {
    const {id} = useParams()
    const state = {id}
    return (
        <StatePageContentLazy state={state}>
            {children}
        </StatePageContentLazy>
    )
}