import { useParams } from "react-router"
import { SubjectPageContentLazy } from "./SubjectPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a subject entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `subject` object, and passes it to the `SubjectPageContentLazy` component.
 * The `SubjectPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `subject`: the fetched subject entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { subject: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `SubjectPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the subject entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/subject/:id" element={<SubjectPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/subject/:id"
 *   element={
 *     <SubjectPage>
 *       {({ subject, onChange, onBlur }) => (
 *         <input value={subject.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </SubjectPage>
 *   }
 * />
 */

export const SubjectPage = ({children}) => {
    const {id} = useParams()
    const subject = {id}
    return (
        <SubjectPageContentLazy subject={subject}>
            {children}
        </SubjectPageContentLazy>
    )
}