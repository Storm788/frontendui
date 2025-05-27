import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { TopicCardCapsule } from "./TopicCardCapsule"
import { TopicMediumCard } from "./TopicMediumCard"

/**
 * A large card component for displaying detailed content and layout for an topic entity.
 *
 * This component wraps an `TopicCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `TopicMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the TopicLargeCard component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {string|number} props.topic.id - The unique identifier for the topic entity.
 * @param {string} props.topic.name - The name or label of the topic entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const topicEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TopicLargeCard topic={topicEntity}>
 *   <p>Additional content for the middle column.</p>
 * </TopicLargeCard>
 */
export const TopicLargeCard = ({topic, children}) => {
    return (
        <TopicCardCapsule topic={topic} >
            <Row>
                <LeftColumn>
                    <TopicMediumCard topic={topic}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </TopicCardCapsule>
    )
}
