import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * UserChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `user` entity along with other props to all child elements.
 * This component is useful for injecting a common `user` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the UserChildren component.
 * @param {any} props.user - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `user` entity.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 1, message: "No data available" };
 *
 * <UserChildren user={userEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </UserChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'user' prop with the specified entity.
 */
export const UserChildren = ({user, children, ...props}) => <ChildWrapper user={user} children={children} {...props} />