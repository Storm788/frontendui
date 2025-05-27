import { useParams } from "react-router"
import { FacilityPageContentLazy } from "./FacilityPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a facility entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `facility` object, and passes it to the `FacilityPageContentLazy` component.
 * The `FacilityPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `facility`: the fetched facility entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { facility: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `FacilityPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the facility entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/facility/:id" element={<FacilityPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/facility/:id"
 *   element={
 *     <FacilityPage>
 *       {({ facility, onChange, onBlur }) => (
 *         <input value={facility.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </FacilityPage>
 *   }
 * />
 */

export const FacilityPage = ({children}) => {
    const {id} = useParams()
    const facility = {id}
    return (
        <FacilityPageContentLazy facility={facility}>
            {children}
        </FacilityPageContentLazy>
    )
}