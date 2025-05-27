import { PersonFill } from "react-bootstrap-icons"
import { PaymentInfoLink } from "./PaymentInfoLink"
import { PaymentInfoCardCapsule } from "./PaymentInfoCardCapsule"
import { PaymentInfoMediumContent } from "./PaymentInfoMediumContent"

/**
 * A card component that displays detailed content for an paymentInfo entity.
 *
 * This component combines `PaymentInfoCardCapsule` and `PaymentInfoMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the paymentInfo entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the PaymentInfoMediumCard component.
 * @param {Object} props.paymentInfo - The object representing the paymentInfo entity.
 * @param {string|number} props.paymentInfo.id - The unique identifier for the paymentInfo entity.
 * @param {string} props.paymentInfo.name - The name or label of the paymentInfo entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const paymentInfoEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentInfoMediumCard paymentInfo={paymentInfoEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </PaymentInfoMediumCard>
 */
export const PaymentInfoMediumCard = ({paymentInfo, children}) => {
    return (
        <PaymentInfoCardCapsule title={<><PersonFill /> <PaymentInfoLink paymentInfo={paymentInfo} /></>}>
            <PaymentInfoMediumContent paymentInfo={paymentInfo}>
                {children}
            </PaymentInfoMediumContent>
        </PaymentInfoCardCapsule>
    )
}
