import { useParams } from "react-router"
import { TopicPageContentLazy } from "./TopicPageContentLazy"

/**
 * A page component for displaying lazy-loaded content of a topic entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `topic` object, and passes it to the `TopicPageContentLazy` component.
 * The `TopicPageContentLazy` handles fetching and rendering of the entity's data.
 *
 * The `children` prop can be a render function that receives:
 * - `topic`: the fetched topic entity,
 * - `onChange`: a callback for change events,
 * - `onBlur`: a callback for blur events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(params: { topic: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function that will be passed to `TopicPageContentLazy`.
 *
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the topic entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/topic/:id" element={<TopicPage />} />
 *
 * // Or using children as a render function:
 * <Route
 *   path="/topic/:id"
 *   element={
 *     <TopicPage>
 *       {({ topic, onChange, onBlur }) => (
 *         <input value={topic.name} onChange={onChange} onBlur={onBlur} />
 *       )}
 *     </TopicPage>
 *   }
 * />
 */

export const TopicPage = ({children}) => {
    const {id} = useParams()
    const topic = {id}
    return (
        <TopicPageContentLazy topic={topic}>
            {children}
        </TopicPageContentLazy>
    )
}