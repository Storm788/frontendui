import { useParams } from "react-router"
import { LessonTypePageContentLazy } from "./LessonTypePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a lessontype entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `lessontype` object, and passes it to the `LessonTypePageContentLazy` component.
 * The `LessonTypePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `lessontype`: the fetched lessontype entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { lessontype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `LessonTypePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the lessontype entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/lessontype/:id" element={<LessonTypePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/lessontype/:id"
 *   element={
 *     <LessonTypePage>
 *       {({ lessontype, onChange, onBlur }) => (
 *         <input value={lessontype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </LessonTypePage>
 *   }
 * />
 */

export const LessonTypePage = ({children}) => {
    const {id} = useParams()
    const lessontype = {id}
    return (
        <LessonTypePageContentLazy lessontype={lessontype}>
            {children}
        </LessonTypePageContentLazy>
    )
}