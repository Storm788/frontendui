import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const TopicURI = `${URIRoot}/topic/view/`;

/**
 * A React component that renders a `ProxyLink` to an "topic" entity's view page.
 *
 * The target URL is dynamically constructed using the `topic` object's `id`, and the link displays
 * the `topic` object's `name` as its clickable content.
 *
 * @function TopicLink
 * @param {Object} props - The properties for the `TopicLink` component.
 * @param {Object} props.topic - The object representing the "topic" entity.
 * @param {string|number} props.topic.id - The unique identifier for the "topic" entity. Used to construct the target URL.
 * @param {string} props.topic.name - The display name for the "topic" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "topic" entity's view page.
 *
 * @example
 * // Example usage with a sample topic entity:
 * const topicEntity = { id: 123, name: "Example Topic Entity" };
 * 
 * <TopicLink topic={topicEntity} />
 * // Renders: <ProxyLink to="/topic/topic/view/123">Example Topic Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/topic/topic/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const TopicLink = ({topic, ...props}) => {
    return <ProxyLink to={TopicURI + topic.id} {...props}>{topic.name}</ProxyLink>
}