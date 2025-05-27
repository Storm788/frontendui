import { useParams } from "react-router"
import { StudentPageContentLazy } from "./StudentPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a student entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `student` object, and passes it to the `StudentPageContentLazy` component.
 * The `StudentPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `student`: the fetched student entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { student: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `StudentPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the student entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/student/:id" element={<StudentPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/student/:id"
 *   element={
 *     <StudentPage>
 *       {({ student, onChange, onBlur }) => (
 *         <input value={student.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StudentPage>
 *   }
 * />
 */

export const StudentPage = ({children}) => {
    const {id} = useParams()
    const student = {id}
    return (
        <StudentPageContentLazy student={student}>
            {children}
        </StudentPageContentLazy>
    )
}