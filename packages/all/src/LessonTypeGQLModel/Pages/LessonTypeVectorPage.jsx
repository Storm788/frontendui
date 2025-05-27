import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { LessonTypeReadPageAsyncAction } from "../Queries"
import { LessonTypeMediumCard } from "../Components"

/**
 * Visualizes a list of lessontype entities using LessonTypeMediumCard.
 *
 * This component receives an array of lessontype objects via the `items` prop
 * and renders a `LessonTypeMediumCard` for each item. Each card is keyed by the lessontype's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of lessontype entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of LessonTypeMediumCard components.
 *
 * @example
 * const lessontypes = [
 *   { id: 1, name: "LessonType 1", ... },
 *   { id: 2, name: "LessonType 2", ... }
 * ];
 *
 * <LessonTypeVisualiser items={lessontypes} />
 */
const LessonTypeVisualiser = ({items}) => {
    return (
        <>
            {items.map(lessontype => (
                <LessonTypeMediumCard key={lessontype.id} lessontype={lessontype} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of lessontype entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting lessontypes using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=LessonTypeVisualiser] - 
 *   Optional component used to visualize the loaded lessontypes. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized lessontypes.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display lessontypes filtered by a `where` clause passed in the URL, e.g.:
 * //   /lessontype?where={"name":"Example"}
 * <LessonTypeVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <LessonTypeVectorPage Visualiser={CustomLessonTypeList}>
 *   <Footer />
 * </LessonTypeVectorPage>
 */
export const LessonTypeVectorPage = ({children, Visualiser=LessonTypeVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for lessontype
            actionParams={actionParams} 
            asyncAction={LessonTypeReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}