import { useParams } from "react-router"
import { ProgramTypePageContentLazy } from "./ProgramTypePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a programtype entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `programtype` object, and passes it to the `ProgramTypePageContentLazy` component.
 * The `ProgramTypePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `programtype`: the fetched programtype entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { programtype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `ProgramTypePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the programtype entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/programtype/:id" element={<ProgramTypePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/programtype/:id"
 *   element={
 *     <ProgramTypePage>
 *       {({ programtype, onChange, onBlur }) => (
 *         <input value={programtype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramTypePage>
 *   }
 * />
 */

export const ProgramTypePage = ({children}) => {
    const {id} = useParams()
    const programtype = {id}
    return (
        <ProgramTypePageContentLazy programtype={programtype}>
            {children}
        </ProgramTypePageContentLazy>
    )
}