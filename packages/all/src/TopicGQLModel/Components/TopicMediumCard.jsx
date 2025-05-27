import { PersonFill } from "react-bootstrap-icons"
import { TopicLink } from "./TopicLink"
import { TopicCardCapsule } from "./TopicCardCapsule"
import { TopicMediumContent } from "./TopicMediumContent"

/**
 * A card component that displays detailed content for an topic entity.
 *
 * This component combines `TopicCardCapsule` and `TopicMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the topic entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the TopicMediumCard component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {string|number} props.topic.id - The unique identifier for the topic entity.
 * @param {string} props.topic.name - The name or label of the topic entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const topicEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TopicMediumCard topic={topicEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </TopicMediumCard>
 */
export const TopicMediumCard = ({topic, children}) => {
    return (
        <TopicCardCapsule title={<><PersonFill /> <TopicLink topic={topic} /></>}>
            <TopicMediumContent topic={topic}>
                {children}
            </TopicMediumContent>
        </TopicCardCapsule>
    )
}
