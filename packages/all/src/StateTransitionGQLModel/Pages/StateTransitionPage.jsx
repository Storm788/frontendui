import { useParams } from "react-router"
import { StateTransitionPageContentLazy } from "./StateTransitionPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a statetransition entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `statetransition` object, and passes it to the `StateTransitionPageContentLazy` component.
 * The `StateTransitionPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `statetransition`: the fetched statetransition entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { statetransition: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `StateTransitionPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the statetransition entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/statetransition/:id" element={<StateTransitionPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/statetransition/:id"
 *   element={
 *     <StateTransitionPage>
 *       {({ statetransition, onChange, onBlur }) => (
 *         <input value={statetransition.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StateTransitionPage>
 *   }
 * />
 */

export const StateTransitionPage = ({children}) => {
    const {id} = useParams()
    const statetransition = {id}
    return (
        <StateTransitionPageContentLazy statetransition={statetransition}>
            {children}
        </StateTransitionPageContentLazy>
    )
}