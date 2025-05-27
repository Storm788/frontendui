import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * GroupChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `group` entity along with other props to all child elements.
 * This component is useful for injecting a common `group` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the GroupChildren component.
 * @param {any} props.group - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `group` entity.
 *
 * @example
 * // Example usage:
 * const groupEntity = { id: 1, message: "No data available" };
 *
 * <GroupChildren group={groupEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </GroupChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'group' prop with the specified entity.
 */
export const GroupChildren = ({group, children, ...props}) => <ChildWrapper group={group} children={children} {...props} />