import { useParams } from "react-router"
import { ProgramLevelTypePageContentLazy } from "./ProgramLevelTypePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a programleveltype entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `programleveltype` object, and passes it to the `ProgramLevelTypePageContentLazy` component.
 * The `ProgramLevelTypePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `programleveltype`: the fetched programleveltype entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { programleveltype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `ProgramLevelTypePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the programleveltype entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/programleveltype/:id" element={<ProgramLevelTypePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/programleveltype/:id"
 *   element={
 *     <ProgramLevelTypePage>
 *       {({ programleveltype, onChange, onBlur }) => (
 *         <input value={programleveltype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramLevelTypePage>
 *   }
 * />
 */

export const ProgramLevelTypePage = ({children}) => {
    const {id} = useParams()
    const programleveltype = {id}
    return (
        <ProgramLevelTypePageContentLazy programleveltype={programleveltype}>
            {children}
        </ProgramLevelTypePageContentLazy>
    )
}