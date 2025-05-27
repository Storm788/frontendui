import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { PaymentCardCapsule } from "./PaymentCardCapsule"
import { PaymentMediumCard } from "./PaymentMediumCard"

/**
 * A large card component for displaying detailed content and layout for an payment entity.
 *
 * This component wraps an `PaymentCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `PaymentMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the PaymentLargeCard component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {string|number} props.payment.id - The unique identifier for the payment entity.
 * @param {string} props.payment.name - The name or label of the payment entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentLargeCard payment={paymentEntity}>
 *   <p>Additional content for the middle column.</p>
 * </PaymentLargeCard>
 */
export const PaymentLargeCard = ({payment, children}) => {
    return (
        <PaymentCardCapsule payment={payment} >
            <Row>
                <LeftColumn>
                    <PaymentMediumCard payment={payment}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </PaymentCardCapsule>
    )
}
