import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { StudyPlanReadPageAsyncAction } from "../Queries"
import { StudyPlanMediumCard } from "../Components"

/**
 * Visualizes a list of studyplan entities using StudyPlanMediumCard.
 *
 * This component receives an array of studyplan objects via the `items` prop
 * and renders a `StudyPlanMediumCard` for each item. Each card is keyed by the studyplan's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of studyplan entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of StudyPlanMediumCard components.
 *
 * @example
 * const studyplans = [
 *   { id: 1, name: "StudyPlan 1", ... },
 *   { id: 2, name: "StudyPlan 2", ... }
 * ];
 *
 * <StudyPlanVisualiser items={studyplans} />
 */
const StudyPlanVisualiser = ({items}) => {
    return (
        <>
            {items.map(studyplan => (
                <StudyPlanMediumCard key={studyplan.id} studyplan={studyplan} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of studyplan entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting studyplans using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=StudyPlanVisualiser] - 
 *   Optional component used to visualize the loaded studyplans. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized studyplans.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display studyplans filtered by a `where` clause passed in the URL, e.g.:
 * //   /studyplan?where={"name":"Example"}
 * <StudyPlanVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <StudyPlanVectorPage Visualiser={CustomStudyPlanList}>
 *   <Footer />
 * </StudyPlanVectorPage>
 */
export const StudyPlanVectorPage = ({children, Visualiser=StudyPlanVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for studyplan
            actionParams={actionParams} 
            asyncAction={StudyPlanReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}