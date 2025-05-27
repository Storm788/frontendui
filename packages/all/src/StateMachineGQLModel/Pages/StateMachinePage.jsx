import { useParams } from "react-router"
import { StateMachinePageContentLazy } from "./StateMachinePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a statemachine entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `statemachine` object, and passes it to the `StateMachinePageContentLazy` component.
 * The `StateMachinePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `statemachine`: the fetched statemachine entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { statemachine: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `StateMachinePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the statemachine entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/statemachine/:id" element={<StateMachinePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/statemachine/:id"
 *   element={
 *     <StateMachinePage>
 *       {({ statemachine, onChange, onBlur }) => (
 *         <input value={statemachine.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StateMachinePage>
 *   }
 * />
 */

export const StateMachinePage = ({children}) => {
    const {id} = useParams()
    const statemachine = {id}
    return (
        <StateMachinePageContentLazy statemachine={statemachine}>
            {children}
        </StateMachinePageContentLazy>
    )
}