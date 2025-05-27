import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * PaymentInfoChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `paymentinfo` entity along with other props to all child elements.
 * This component is useful for injecting a common `paymentinfo` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the PaymentInfoChildren component.
 * @param {any} props.paymentinfo - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `paymentinfo` entity.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { id: 1, message: "No data available" };
 *
 * <PaymentInfoChildren paymentinfo={paymentinfoEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </PaymentInfoChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'paymentinfo' prop with the specified entity.
 */
export const PaymentInfoChildren = ({paymentinfo, children, ...props}) => <ChildWrapper paymentinfo={paymentinfo} children={children} {...props} />