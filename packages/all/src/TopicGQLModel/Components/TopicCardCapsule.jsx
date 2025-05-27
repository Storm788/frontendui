import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { TopicLink } from "./TopicLink"

/**
 * A specialized card component that displays an `TopicLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `TopicLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `topic` object.
 *
 * @component
 * @param {Object} props - The props for the TopicCardCapsule component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {string|number} props.topic.id - The unique identifier for the topic entity.
 * @param {string} props.topic.name - The display name for the topic entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { TopicCardCapsule } from './TopicCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const topicEntity = { id: 123, name: "Example Entity" };
 *
 * <TopicCardCapsule topic={topicEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </TopicCardCapsule>
 */
export const TopicCardCapsule = ({topic, children, title=<><PersonFill /> <TopicLink topic={topic} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
