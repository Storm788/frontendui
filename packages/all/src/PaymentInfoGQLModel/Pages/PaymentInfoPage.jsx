import { useParams } from "react-router"
import { PaymentInfoPageContentLazy } from "./PaymentInfoPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a paymentinfo entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `paymentinfo` object, and passes it to the `PaymentInfoPageContentLazy` component.
 * The `PaymentInfoPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `paymentinfo`: the fetched paymentinfo entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { paymentinfo: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `PaymentInfoPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the paymentinfo entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/paymentinfo/:id" element={<PaymentInfoPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/paymentinfo/:id"
 *   element={
 *     <PaymentInfoPage>
 *       {({ paymentinfo, onChange, onBlur }) => (
 *         <input value={paymentinfo.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </PaymentInfoPage>
 *   }
 * />
 */

export const PaymentInfoPage = ({children}) => {
    const {id} = useParams()
    const paymentinfo = {id}
    return (
        <PaymentInfoPageContentLazy paymentinfo={paymentinfo}>
            {children}
        </PaymentInfoPageContentLazy>
    )
}