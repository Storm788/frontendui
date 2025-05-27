import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const LessonURI = `${URIRoot}/lesson/view/`;

/**
 * A React component that renders a `ProxyLink` to an "lesson" entity's view page.
 *
 * The target URL is dynamically constructed using the `lesson` object's `id`, and the link displays
 * the `lesson` object's `name` as its clickable content.
 *
 * @function LessonLink
 * @param {Object} props - The properties for the `LessonLink` component.
 * @param {Object} props.lesson - The object representing the "lesson" entity.
 * @param {string|number} props.lesson.id - The unique identifier for the "lesson" entity. Used to construct the target URL.
 * @param {string} props.lesson.name - The display name for the "lesson" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "lesson" entity's view page.
 *
 * @example
 * // Example usage with a sample lesson entity:
 * const lessonEntity = { id: 123, name: "Example Lesson Entity" };
 * 
 * <LessonLink lesson={lessonEntity} />
 * // Renders: <ProxyLink to="/lesson/lesson/view/123">Example Lesson Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/lesson/lesson/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const LessonLink = ({lesson, ...props}) => {
    return <ProxyLink to={LessonURI + lesson.id} {...props}>{lesson.name}</ProxyLink>
}