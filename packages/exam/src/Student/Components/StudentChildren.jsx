import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * StudentChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `student` entity along with other props to all child elements.
 * This component is useful for injecting a common `student` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the StudentChildren component.
 * @param {any} props.student - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `student` entity.
 *
 * @example
 * // Example usage:
 * const studentEntity = { id: 1, message: "No data available" };
 *
 * <StudentChildren student={studentEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </StudentChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'student' prop with the specified entity.
 */
export const StudentChildren = ({student, children, ...props}) => <ChildWrapper student={student} children={children} {...props} />