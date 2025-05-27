import { TopicLargeCard } from "../Components"
import { TopicPageNavbar } from "./TopicPageNavbar"

/**
 * Renders a page layout for a single topic entity, including navigation and detailed view.
 *
 * This component wraps `TopicPageNavbar` and `TopicLargeCard` to provide a consistent
 * interface for displaying an individual topic. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.topic - The topic entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a topic.
 *
 * @example
 * const topic = { id: 1, name: "Example Topic" };
 * <TopicPageContent topic={topic}>
 *   <p>Additional info here.</p>
 * </TopicPageContent>
 */
export const TopicPageContent = ({topic, children, ...props}) => {
    return (<>
        <TopicPageNavbar topic={topic} />
        <TopicLargeCard topic={topic} {...props} >
            Topic {JSON.stringify(topic)}
            {children}
        </TopicLargeCard>
    </>)
}