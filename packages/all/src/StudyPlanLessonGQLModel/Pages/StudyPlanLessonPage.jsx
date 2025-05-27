import { useParams } from "react-router"
import { StudyPlanLessonPageContentLazy } from "./StudyPlanLessonPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a studyplanlesson entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `studyplanlesson` object, and passes it to the `StudyPlanLessonPageContentLazy` component.
 * The `StudyPlanLessonPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `studyplanlesson`: the fetched studyplanlesson entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { studyplanlesson: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `StudyPlanLessonPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the studyplanlesson entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/studyplanlesson/:id" element={<StudyPlanLessonPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/studyplanlesson/:id"
 *   element={
 *     <StudyPlanLessonPage>
 *       {({ studyplanlesson, onChange, onBlur }) => (
 *         <input value={studyplanlesson.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </StudyPlanLessonPage>
 *   }
 * />
 */

export const StudyPlanLessonPage = ({children}) => {
    const {id} = useParams()
    const studyplanlesson = {id}
    return (
        <StudyPlanLessonPageContentLazy studyplanlesson={studyplanlesson}>
            {children}
        </StudyPlanLessonPageContentLazy>
    )
}