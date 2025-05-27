import { PersonFill } from "react-bootstrap-icons"
import { PaymentLink } from "./PaymentLink"
import { PaymentCardCapsule } from "./PaymentCardCapsule"
import { PaymentMediumContent } from "./PaymentMediumContent"

/**
 * A card component that displays detailed content for an payment entity.
 *
 * This component combines `PaymentCardCapsule` and `PaymentMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the payment entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the PaymentMediumCard component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {string|number} props.payment.id - The unique identifier for the payment entity.
 * @param {string} props.payment.name - The name or label of the payment entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentMediumCard payment={paymentEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </PaymentMediumCard>
 */
export const PaymentMediumCard = ({payment, children}) => {
    return (
        <PaymentCardCapsule title={<><PersonFill /> <PaymentLink payment={payment} /></>}>
            <PaymentMediumContent payment={payment}>
                {children}
            </PaymentMediumContent>
        </PaymentCardCapsule>
    )
}
