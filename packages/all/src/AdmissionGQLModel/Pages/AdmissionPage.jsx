import { useParams } from "react-router"
import { AdmissionPageContentLazy } from "./AdmissionPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a admission entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `admission` object, and passes it to the `AdmissionPageContentLazy` component.
 * The `AdmissionPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `admission`: the fetched admission entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { admission: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `AdmissionPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the admission entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/admission/:id" element={<AdmissionPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/admission/:id"
 *   element={
 *     <AdmissionPage>
 *       {({ admission, onChange, onBlur }) => (
 *         <input value={admission.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </AdmissionPage>
 *   }
 * />
 */

export const AdmissionPage = ({children}) => {
    const {id} = useParams()
    const admission = {id}
    return (
        <AdmissionPageContentLazy admission={admission}>
            {children}
        </AdmissionPageContentLazy>
    )
}