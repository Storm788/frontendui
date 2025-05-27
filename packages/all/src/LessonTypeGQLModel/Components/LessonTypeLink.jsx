import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const LessonTypeURI = `${URIRoot}/lessontype/view/`;

/**
 * A React component that renders a `ProxyLink` to an "lessontype" entity's view page.
 *
 * The target URL is dynamically constructed using the `lessontype` object's `id`, and the link displays
 * the `lessontype` object's `name` as its clickable content.
 *
 * @function LessonTypeLink
 * @param {Object} props - The properties for the `LessonTypeLink` component.
 * @param {Object} props.lessontype - The object representing the "lessontype" entity.
 * @param {string|number} props.lessontype.id - The unique identifier for the "lessontype" entity. Used to construct the target URL.
 * @param {string} props.lessontype.name - The display name for the "lessontype" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "lessontype" entity's view page.
 *
 * @example
 * // Example usage with a sample lessontype entity:
 * const lessontypeEntity = { id: 123, name: "Example LessonType Entity" };
 * 
 * <LessonTypeLink lessontype={lessontypeEntity} />
 * // Renders: <ProxyLink to="/lessontype/lessontype/view/123">Example LessonType Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/lessontype/lessontype/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const LessonTypeLink = ({lessontype, ...props}) => {
    return <ProxyLink to={LessonTypeURI + lessontype.id} {...props}>{lessontype.name}</ProxyLink>
}