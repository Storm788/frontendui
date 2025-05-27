import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const PaymentInfoURI = `${URIRoot}/paymentInfo/view/`;

/**
 * A React component that renders a `ProxyLink` to an "paymentInfo" entity's view page.
 *
 * The target URL is dynamically constructed using the `paymentInfo` object's `id`, and the link displays
 * the `paymentInfo` object's `name` as its clickable content.
 *
 * @function PaymentInfoLink
 * @param {Object} props - The properties for the `PaymentInfoLink` component.
 * @param {Object} props.paymentInfo - The object representing the "paymentInfo" entity.
 * @param {string|number} props.paymentInfo.id - The unique identifier for the "paymentInfo" entity. Used to construct the target URL.
 * @param {string} props.paymentInfo.name - The display name for the "paymentInfo" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "paymentInfo" entity's view page.
 *
 * @example
 * // Example usage with a sample paymentInfo entity:
 * const paymentInfoEntity = { id: 123, name: "Example PaymentInfo Entity" };
 * 
 * <PaymentInfoLink paymentInfo={paymentInfoEntity} />
 * // Renders: <ProxyLink to="/paymentInfo/paymentInfo/view/123">Example PaymentInfo Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/paymentInfo/paymentInfo/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const PaymentInfoLink = ({paymentInfo, ...props}) => {
    return <ProxyLink to={PaymentInfoURI + paymentInfo.id} {...props}>{paymentInfo.name}</ProxyLink>
}