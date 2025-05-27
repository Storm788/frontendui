import { useParams } from "react-router"
import { ProgramTitleTypePageContentLazy } from "./ProgramTitleTypePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a programtitletype entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `programtitletype` object, and passes it to the `ProgramTitleTypePageContentLazy` component.
 * The `ProgramTitleTypePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `programtitletype`: the fetched programtitletype entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { programtitletype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `ProgramTitleTypePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the programtitletype entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/programtitletype/:id" element={<ProgramTitleTypePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/programtitletype/:id"
 *   element={
 *     <ProgramTitleTypePage>
 *       {({ programtitletype, onChange, onBlur }) => (
 *         <input value={programtitletype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramTitleTypePage>
 *   }
 * />
 */

export const ProgramTitleTypePage = ({children}) => {
    const {id} = useParams()
    const programtitletype = {id}
    return (
        <ProgramTitleTypePageContentLazy programtitletype={programtitletype}>
            {children}
        </ProgramTitleTypePageContentLazy>
    )
}