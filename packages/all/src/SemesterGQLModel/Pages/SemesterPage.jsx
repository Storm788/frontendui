import { useParams } from "react-router"
import { SemesterPageContentLazy } from "./SemesterPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a semester entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `semester` object, and passes it to the `SemesterPageContentLazy` component.
 * The `SemesterPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `semester`: the fetched semester entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { semester: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `SemesterPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the semester entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/semester/:id" element={<SemesterPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/semester/:id"
 *   element={
 *     <SemesterPage>
 *       {({ semester, onChange, onBlur }) => (
 *         <input value={semester.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </SemesterPage>
 *   }
 * />
 */

export const SemesterPage = ({children}) => {
    const {id} = useParams()
    const semester = {id}
    return (
        <SemesterPageContentLazy semester={semester}>
            {children}
        </SemesterPageContentLazy>
    )
}