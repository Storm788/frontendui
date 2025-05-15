import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const SubjectURI = '/subject/subject/view/';

/**
 * A React component that renders a `ProxyLink` to an "subject" entity's view page.
 *
 * The target URL is dynamically constructed using the `subject` object's `id`, and the link displays
 * the `subject` object's `name` as its clickable content.
 *
 * @function SubjectLink
 * @param {Object} props - The properties for the `SubjectLink` component.
 * @param {Object} props.subject - The object representing the "subject" entity.
 * @param {string|number} props.subject.id - The unique identifier for the "subject" entity. Used to construct the target URL.
 * @param {string} props.subject.name - The display name for the "subject" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "subject" entity's view page.
 *
 * @example
 * // Example usage with a sample subject entity:
 * const subjectEntity = { id: 123, name: "Example Subject Entity" };
 * 
 * <SubjectLink subject={subjectEntity} />
 * // Renders: <ProxyLink to="/subject/subject/view/123">Example Subject Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/subject/subject/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const SubjectLink = ({subject}) => {
    return <ProxyLink to={SubjectURI + subject.id}>{subject.name}</ProxyLink>
}