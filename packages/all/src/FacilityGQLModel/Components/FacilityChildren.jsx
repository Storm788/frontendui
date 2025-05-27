import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * FacilityChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `facility` entity along with other props to all child elements.
 * This component is useful for injecting a common `facility` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the FacilityChildren component.
 * @param {any} props.facility - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `facility` entity.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { id: 1, message: "No data available" };
 *
 * <FacilityChildren facility={facilityEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </FacilityChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'facility' prop with the specified entity.
 */
export const FacilityChildren = ({facility, children, ...props}) => <ChildWrapper facility={facility} children={children} {...props} />