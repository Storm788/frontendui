import { useParams } from "react-router"
import { ProgramPageContentLazy } from "./ProgramPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a program entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `program` object, and passes it to the `ProgramPageContentLazy` component.
 * The `ProgramPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `program`: the fetched program entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { program: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `ProgramPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the program entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/program/:id" element={<ProgramPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/program/:id"
 *   element={
 *     <ProgramPage>
 *       {({ program, onChange, onBlur }) => (
 *         <input value={program.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </ProgramPage>
 *   }
 * />
 */

export const ProgramPage = ({children}) => {
    const {id} = useParams()
    const program = {id}
    return (
        <ProgramPageContentLazy program={program}>
            {children}
        </ProgramPageContentLazy>
    )
}