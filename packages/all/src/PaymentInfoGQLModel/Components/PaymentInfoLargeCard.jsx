import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { PaymentInfoCardCapsule } from "./PaymentInfoCardCapsule"
import { PaymentInfoMediumCard } from "./PaymentInfoMediumCard"

/**
 * A large card component for displaying detailed content and layout for an paymentinfo entity.
 *
 * This component wraps an `PaymentInfoCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `PaymentInfoMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the PaymentInfoLargeCard component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {string|number} props.paymentinfo.id - The unique identifier for the paymentinfo entity.
 * @param {string} props.paymentinfo.name - The name or label of the paymentinfo entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentInfoLargeCard paymentinfo={paymentinfoEntity}>
 *   <p>Additional content for the middle column.</p>
 * </PaymentInfoLargeCard>
 */
export const PaymentInfoLargeCard = ({paymentinfo, children}) => {
    return (
        <PaymentInfoCardCapsule paymentinfo={paymentinfo} >
            <Row>
                <LeftColumn>
                    <PaymentInfoMediumCard paymentinfo={paymentinfo}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </PaymentInfoCardCapsule>
    )
}
