import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { TopicReadPageAsyncAction } from "../Queries"
import { TopicMediumCard } from "../Components"

/**
 * Visualizes a list of topic entities using TopicMediumCard.
 *
 * This component receives an array of topic objects via the `items` prop
 * and renders a `TopicMediumCard` for each item. Each card is keyed by the topic's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of topic entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of TopicMediumCard components.
 *
 * @example
 * const topics = [
 *   { id: 1, name: "Topic 1", ... },
 *   { id: 2, name: "Topic 2", ... }
 * ];
 *
 * <TopicVisualiser items={topics} />
 */
const TopicVisualiser = ({items}) => {
    return (
        <>
            {items.map(topic => (
                <TopicMediumCard key={topic.id} topic={topic} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of topic entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting topics using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=TopicVisualiser] - 
 *   Optional component used to visualize the loaded topics. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized topics.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display topics filtered by a `where` clause passed in the URL, e.g.:
 * //   /topic?where={"name":"Example"}
 * <TopicVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <TopicVectorPage Visualiser={CustomTopicList}>
 *   <Footer />
 * </TopicVectorPage>
 */
export const TopicVectorPage = ({children, Visualiser=TopicVisualiser}) => {
    const { search } = useLocation();
    let actionParams = { skip: 0, limit: 10};
    try {
        const params = new URLSearchParams(search);
        const where = params.get('where');        
        actionParams.where = where ? JSON.parse(where) : undefined;
    } catch (e) {
        console.warn("Invalid 'where' query parameter!", e);
    }
    return (<>
        <MyNavbar onSearchChange={onSearchChange} />
        <InfiniteScroll
            preloadedItems={[]} // No preloaded items for topic
            actionParams={actionParams} 
            asyncAction={TopicReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}