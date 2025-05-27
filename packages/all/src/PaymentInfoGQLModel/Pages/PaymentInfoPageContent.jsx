import { PaymentInfoLargeCard } from "../Components"
import { PaymentInfoPageNavbar } from "./PaymentInfoPageNavbar"

/**
 * Renders a page layout for a single paymentinfo entity, including navigation and detailed view.
 *
 * This component wraps `PaymentInfoPageNavbar` and `PaymentInfoLargeCard` to provide a consistent
 * interface for displaying an individual paymentinfo. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.paymentinfo - The paymentinfo entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a paymentinfo.
 *
 * @example
 * const paymentinfo = { id: 1, name: "Example PaymentInfo" };
 * <PaymentInfoPageContent paymentinfo={paymentinfo}>
 *   <p>Additional info here.</p>
 * </PaymentInfoPageContent>
 */
export const PaymentInfoPageContent = ({paymentinfo, children, ...props}) => {
    return (<>
        <PaymentInfoPageNavbar paymentinfo={paymentinfo} />
        <PaymentInfoLargeCard paymentinfo={paymentinfo} {...props} >
            PaymentInfo {JSON.stringify(paymentinfo)}
            {children}
        </PaymentInfoLargeCard>
    </>)
}