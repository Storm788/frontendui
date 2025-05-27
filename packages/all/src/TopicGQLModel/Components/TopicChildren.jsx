import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * TopicChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `topic` entity along with other props to all child elements.
 * This component is useful for injecting a common `topic` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the TopicChildren component.
 * @param {any} props.topic - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `topic` entity.
 *
 * @example
 * // Example usage:
 * const topicEntity = { id: 1, message: "No data available" };
 *
 * <TopicChildren topic={topicEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </TopicChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'topic' prop with the specified entity.
 */
export const TopicChildren = ({topic, children, ...props}) => <ChildWrapper topic={topic} children={children} {...props} />