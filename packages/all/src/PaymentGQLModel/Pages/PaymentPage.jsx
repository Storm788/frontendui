import { useParams } from "react-router"
import { PaymentPageContentLazy } from "./PaymentPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a payment entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `payment` object, and passes it to the `PaymentPageContentLazy` component.
 * The `PaymentPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `payment`: the fetched payment entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { payment: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `PaymentPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the payment entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/payment/:id" element={<PaymentPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/payment/:id"
 *   element={
 *     <PaymentPage>
 *       {({ payment, onChange, onBlur }) => (
 *         <input value={payment.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </PaymentPage>
 *   }
 * />
 */

export const PaymentPage = ({children}) => {
    const {id} = useParams()
    const payment = {id}
    return (
        <PaymentPageContentLazy payment={payment}>
            {children}
        </PaymentPageContentLazy>
    )
}