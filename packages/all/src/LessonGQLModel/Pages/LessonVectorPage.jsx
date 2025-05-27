import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { LessonReadPageAsyncAction } from "../Queries"
import { LessonMediumCard } from "../Components"

/**
 * Visualizes a list of lesson entities using LessonMediumCard.
 *
 * This component receives an array of lesson objects via the `items` prop
 * and renders a `LessonMediumCard` for each item. Each card is keyed by the lesson's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of lesson entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of LessonMediumCard components.
 *
 * @example
 * const lessons = [
 *   { id: 1, name: "Lesson 1", ... },
 *   { id: 2, name: "Lesson 2", ... }
 * ];
 *
 * <LessonVisualiser items={lessons} />
 */
const LessonVisualiser = ({items}) => {
    return (
        <>
            {items.map(lesson => (
                <LessonMediumCard key={lesson.id} lesson={lesson} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of lesson entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting lessons using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=LessonVisualiser] - 
 *   Optional component used to visualize the loaded lessons. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized lessons.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display lessons filtered by a `where` clause passed in the URL, e.g.:
 * //   /lesson?where={"name":"Example"}
 * <LessonVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <LessonVectorPage Visualiser={CustomLessonList}>
 *   <Footer />
 * </LessonVectorPage>
 */
export const LessonVectorPage = ({children, Visualiser=LessonVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for lesson
            actionParams={actionParams} 
            asyncAction={LessonReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}