import { useParams } from "react-router"
import { ProgramFormTypePageContentLazy } from "./ProgramFormTypePageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a programformtype entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `programformtype` object, and passes it to the `ProgramFormTypePageContentLazy` component.
 * The `ProgramFormTypePageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `programformtype`: the fetched programformtype entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { programformtype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `ProgramFormTypePageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the programformtype entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/programformtype/:id" element={<ProgramFormTypePage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/programformtype/:id"
 *   element={
 *     <ProgramFormTypePage>
 *       {({ programformtype, onChange, onBlur }) => (
 *         <input value={programformtype.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramFormTypePage>
 *   }
 * />
 */

export const ProgramFormTypePage = ({children}) => {
    const {id} = useParams()
    const programformtype = {id}
    return (
        <ProgramFormTypePageContentLazy programformtype={programformtype}>
            {children}
        </ProgramFormTypePageContentLazy>
    )
}