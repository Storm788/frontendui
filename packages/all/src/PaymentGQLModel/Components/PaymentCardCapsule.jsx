import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { PaymentLink } from "./PaymentLink"

/**
 * A specialized card component that displays an `PaymentLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `PaymentLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `payment` object.
 *
 * @component
 * @param {Object} props - The props for the PaymentCardCapsule component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {string|number} props.payment.id - The unique identifier for the payment entity.
 * @param {string} props.payment.name - The display name for the payment entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { PaymentCardCapsule } from './PaymentCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const paymentEntity = { id: 123, name: "Example Entity" };
 *
 * <PaymentCardCapsule payment={paymentEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </PaymentCardCapsule>
 */
export const PaymentCardCapsule = ({payment, children, title=<><PersonFill /> <PaymentLink payment={payment} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
