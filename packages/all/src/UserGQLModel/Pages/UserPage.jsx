import { useParams } from "react-router"
import { UserPageContentLazy } from "./UserPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a user entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `user` object, and passes it to the `UserPageContentLazy` component.
 * The `UserPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `user`: the fetched user entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { user: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `UserPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the user entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/user/:id" element={<UserPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/user/:id"
 *   element={
 *     <UserPage>
 *       {({ user, onChange, onBlur }) => (
 *         <input value={user.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </UserPage>
 *   }
 * />
 */

export const UserPage = ({children}) => {
    const {id} = useParams()
    const user = {id}
    return (
        <UserPageContentLazy user={user}>
            {children}
        </UserPageContentLazy>
    )
}