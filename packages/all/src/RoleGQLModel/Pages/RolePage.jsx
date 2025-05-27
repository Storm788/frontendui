import { useParams } from "react-router"
import { RolePageContentLazy } from "./RolePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a role entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `role` object, and passes it to the `RolePageContentLazy` component.
 * The `RolePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `role`: the fetched role entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { role: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `RolePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the role entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/role/:id" element={<RolePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/role/:id"
 *   element={
 *     <RolePage>
 *       {({ role, onChange, onBlur }) => (
 *         <input value={role.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </RolePage>
 *   }
 * />
 */

export const RolePage = ({children}) => {
    const {id} = useParams()
    const role = {id}
    return (
        <RolePageContentLazy role={role}>
            {children}
        </RolePageContentLazy>
    )
}