import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { StudyPlanLessonReadPageAsyncAction } from "../Queries"
import { StudyPlanLessonMediumCard } from "../Components"

/**
 * Visualizes a list of studyplanlesson entities using StudyPlanLessonMediumCard.
 *
 * This component receives an array of studyplanlesson objects via the `items` prop
 * and renders a `StudyPlanLessonMediumCard` for each item. Each card is keyed by the studyplanlesson's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of studyplanlesson entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of StudyPlanLessonMediumCard components.
 *
 * @example
 * const studyplanlessons = [
 *   { id: 1, name: "StudyPlanLesson 1", ... },
 *   { id: 2, name: "StudyPlanLesson 2", ... }
 * ];
 *
 * <StudyPlanLessonVisualiser items={studyplanlessons} />
 */
const StudyPlanLessonVisualiser = ({items}) => {
    return (
        <>
            {items.map(studyplanlesson => (
                <StudyPlanLessonMediumCard key={studyplanlesson.id} studyplanlesson={studyplanlesson} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of studyplanlesson entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting studyplanlessons using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=StudyPlanLessonVisualiser] - 
 *   Optional component used to visualize the loaded studyplanlessons. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized studyplanlessons.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display studyplanlessons filtered by a `where` clause passed in the URL, e.g.:
 * //   /studyplanlesson?where={"name":"Example"}
 * <StudyPlanLessonVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <StudyPlanLessonVectorPage Visualiser={CustomStudyPlanLessonList}>
 *   <Footer />
 * </StudyPlanLessonVectorPage>
 */
export const StudyPlanLessonVectorPage = ({children, Visualiser=StudyPlanLessonVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for studyplanlesson
            actionParams={actionParams} 
            asyncAction={StudyPlanLessonReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}