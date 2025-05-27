import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const SemesterURI = `${URIRoot}/semester/view/`;

/**
 * A React component that renders a `ProxyLink` to an "semester" entity's view page.
 *
 * The target URL is dynamically constructed using the `semester` object's `id`, and the link displays
 * the `semester` object's `name` as its clickable content.
 *
 * @function SemesterLink
 * @param {Object} props - The properties for the `SemesterLink` component.
 * @param {Object} props.semester - The object representing the "semester" entity.
 * @param {string|number} props.semester.id - The unique identifier for the "semester" entity. Used to construct the target URL.
 * @param {string} props.semester.name - The display name for the "semester" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "semester" entity's view page.
 *
 * @example
 * // Example usage with a sample semester entity:
 * const semesterEntity = { id: 123, name: "Example Semester Entity" };
 * 
 * <SemesterLink semester={semesterEntity} />
 * // Renders: <ProxyLink to="/semester/semester/view/123">Example Semester Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/semester/semester/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const SemesterLink = ({semester, ...props}) => {
    return <ProxyLink to={SemesterURI + semester.id} {...props}>{semester?.order || 1}</ProxyLink>
}