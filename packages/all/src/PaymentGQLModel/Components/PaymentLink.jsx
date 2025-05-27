import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const PaymentURI = `${URIRoot}/payment/view/`;

/**
 * A React component that renders a `ProxyLink` to an "payment" entity's view page.
 *
 * The target URL is dynamically constructed using the `payment` object's `id`, and the link displays
 * the `payment` object's `name` as its clickable content.
 *
 * @function PaymentLink
 * @param {Object} props - The properties for the `PaymentLink` component.
 * @param {Object} props.payment - The object representing the "payment" entity.
 * @param {string|number} props.payment.id - The unique identifier for the "payment" entity. Used to construct the target URL.
 * @param {string} props.payment.name - The display name for the "payment" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "payment" entity's view page.
 *
 * @example
 * // Example usage with a sample payment entity:
 * const paymentEntity = { id: 123, name: "Example Payment Entity" };
 * 
 * <PaymentLink payment={paymentEntity} />
 * // Renders: <ProxyLink to="/payment/payment/view/123">Example Payment Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/payment/payment/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const PaymentLink = ({payment, ...props}) => {
    return <ProxyLink to={PaymentURI + payment.id} {...props}>{payment.name}</ProxyLink>
}