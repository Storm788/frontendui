import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const StudentURI = `/student/student/view/`;

/**
 * A React component that renders a `ProxyLink` to an "student" entity's view page.
 *
 * The target URL is dynamically constructed using the `student` object's `id`, and the link displays
 * the `student` object's `name` as its clickable content.
 *
 * @function StudentLink
 * @param {Object} props - The properties for the `StudentLink` component.
 * @param {Object} props.student - The object representing the "student" entity.
 * @param {string|number} props.student.id - The unique identifier for the "student" entity. Used to construct the target URL.
 * @param {string} props.student.name - The display name for the "student" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "student" entity's view page.
 *
 * @example
 * // Example usage with a sample student entity:
 * const studentEntity = { id: 123, name: "Example Student Entity" };
 * 
 * <StudentLink student={studentEntity} />
 * // Renders: <ProxyLink to="/student/student/view/123">Example Student Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/student/student/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const StudentLink = ({student, ...props}) => {
    return <ProxyLink to={StudentURI + student.id} {...props}>{student.name}</ProxyLink>
}