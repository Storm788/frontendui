import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { SemesterReadPageAsyncAction } from "../Queries"
import { SemesterMediumCard } from "../Components"

/**
 * Visualizes a list of semester entities using SemesterMediumCard.
 *
 * This component receives an array of semester objects via the `items` prop
 * and renders a `SemesterMediumCard` for each item. Each card is keyed by the semester's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of semester entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of SemesterMediumCard components.
 *
 * @example
 * const semesters = [
 *   { id: 1, name: "Semester 1", ... },
 *   { id: 2, name: "Semester 2", ... }
 * ];
 *
 * <SemesterVisualiser items={semesters} />
 */
const SemesterVisualiser = ({items}) => {
    return (
        <>
            {items.map(semester => (
                <SemesterMediumCard key={semester.id} semester={semester} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of semester entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting semesters using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=SemesterVisualiser] - 
 *   Optional component used to visualize the loaded semesters. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized semesters.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display semesters filtered by a `where` clause passed in the URL, e.g.:
 * //   /semester?where={"name":"Example"}
 * <SemesterVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <SemesterVectorPage Visualiser={CustomSemesterList}>
 *   <Footer />
 * </SemesterVectorPage>
 */
export const SemesterVectorPage = ({children, Visualiser=SemesterVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for semester
            actionParams={actionParams} 
            asyncAction={SemesterReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}