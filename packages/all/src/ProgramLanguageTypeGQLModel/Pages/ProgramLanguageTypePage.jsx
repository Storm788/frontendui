import { useParams } from "react-router"
import { ProgramLanguageTypePageContentLazy } from "./ProgramLanguageTypePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a programlanguagetype entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `programlanguagetype` object, and passes it to the `ProgramLanguageTypePageContentLazy` component.
 * The `ProgramLanguageTypePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `programlanguagetype`: the fetched programlanguagetype entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { programlanguagetype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `ProgramLanguageTypePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the programlanguagetype entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/programlanguagetype/:id" element={<ProgramLanguageTypePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/programlanguagetype/:id"
 *   element={
 *     <ProgramLanguageTypePage>
 *       {({ programlanguagetype, onChange, onBlur }) => (
 *         <input value={programlanguagetype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramLanguageTypePage>
 *   }
 * />
 */

export const ProgramLanguageTypePage = ({children}) => {
    const {id} = useParams()
    const programlanguagetype = {id}
    return (
        <ProgramLanguageTypePageContentLazy programlanguagetype={programlanguagetype}>
            {children}
        </ProgramLanguageTypePageContentLazy>
    )
}