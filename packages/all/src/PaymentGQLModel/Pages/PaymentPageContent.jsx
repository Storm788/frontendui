import { PaymentLargeCard } from "../Components"
import { PaymentPageNavbar } from "./PaymentPageNavbar"

/**
 * Renders a page layout for a single payment entity, including navigation and detailed view.
 *
 * This component wraps `PaymentPageNavbar` and `PaymentLargeCard` to provide a consistent
 * interface for displaying an individual payment. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.payment - The payment entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a payment.
 *
 * @example
 * const payment = { id: 1, name: "Example Payment" };
 * <PaymentPageContent payment={payment}>
 *   <p>Additional info here.</p>
 * </PaymentPageContent>
 */
export const PaymentPageContent = ({payment, children, ...props}) => {
    return (<>
        <PaymentPageNavbar payment={payment} />
        <PaymentLargeCard payment={payment} {...props} >
            Payment {JSON.stringify(payment)}
            {children}
        </PaymentLargeCard>
    </>)
}