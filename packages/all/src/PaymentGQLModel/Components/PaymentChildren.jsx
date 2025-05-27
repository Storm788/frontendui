import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * PaymentChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `payment` entity along with other props to all child elements.
 * This component is useful for injecting a common `payment` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the PaymentChildren component.
 * @param {any} props.payment - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `payment` entity.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { id: 1, message: "No data available" };
 *
 * <PaymentChildren payment={paymentEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </PaymentChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'payment' prop with the specified entity.
 */
export const PaymentChildren = ({payment, children, ...props}) => <ChildWrapper payment={payment} children={children} {...props} />