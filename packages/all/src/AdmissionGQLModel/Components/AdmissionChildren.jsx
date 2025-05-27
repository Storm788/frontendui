import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * AdmissionChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `admission` entity along with other props to all child elements.
 * This component is useful for injecting a common `admission` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the AdmissionChildren component.
 * @param {any} props.admission - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `admission` entity.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { id: 1, message: "No data available" };
 *
 * <AdmissionChildren admission={admissionEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </AdmissionChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'admission' prop with the specified entity.
 */
export const AdmissionChildren = ({admission, children, ...props}) => <ChildWrapper admission={admission} children={children} {...props} />