import { useParams } from "react-router"
import { GroupPageContentLazy } from "./GroupPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a group entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `group` object, and passes it to the `GroupPageContentLazy` component.
 * The `GroupPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `group`: the fetched group entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { group: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `GroupPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the group entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/group/:id" element={<GroupPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/group/:id"
 *   element={
 *     <GroupPage>
 *       {({ group, onChange, onBlur }) => (
 *         <input value={group.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </GroupPage>
 *   }
 * />
 */

export const GroupPage = ({children}) => {
    const {id} = useParams()
    const group = {id}
    return (
        <GroupPageContentLazy group={group}>
            {children}
        </GroupPageContentLazy>
    )
}