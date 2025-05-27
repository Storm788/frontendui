import { useParams } from "react-router"
import { LessonPageContentLazy } from "./LessonPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a lesson entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `lesson` object, and passes it to the `LessonPageContentLazy` component.
 * The `LessonPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `lesson`: the fetched lesson entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { lesson: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `LessonPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the lesson entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/lesson/:id" element={<LessonPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/lesson/:id"
 *   element={
 *     <LessonPage>
 *       {({ lesson, onChange, onBlur }) => (
 *         <input value={lesson.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </LessonPage>
 *   }
 * />
 */

export const LessonPage = ({children}) => {
    const {id} = useParams()
    const lesson = {id}
    return (
        <LessonPageContentLazy lesson={lesson}>
            {children}
        </LessonPageContentLazy>
    )
}