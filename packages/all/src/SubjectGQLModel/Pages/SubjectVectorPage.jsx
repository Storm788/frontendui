import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { SubjectReadPageAsyncAction } from "../Queries"
import { SubjectMediumCard } from "../Components"

/**
 * Visualizes a list of subject entities using SubjectMediumCard.
 *
 * This component receives an array of subject objects via the `items` prop
 * and renders a `SubjectMediumCard` for each item. Each card is keyed by the subject's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of subject entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of SubjectMediumCard components.
 *
 * @example
 * const subjects = [
 *   { id: 1, name: "Subject 1", ... },
 *   { id: 2, name: "Subject 2", ... }
 * ];
 *
 * <SubjectVisualiser items={subjects} />
 */
const SubjectVisualiser = ({items}) => {
    return (
        <>
            {items.map(subject => (
                <SubjectMediumCard key={subject.id} subject={subject} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of subject entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting subjects using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=SubjectVisualiser] - 
 *   Optional component used to visualize the loaded subjects. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized subjects.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display subjects filtered by a `where` clause passed in the URL, e.g.:
 * //   /subject?where={"name":"Example"}
 * <SubjectVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <SubjectVectorPage Visualiser={CustomSubjectList}>
 *   <Footer />
 * </SubjectVectorPage>
 */
export const SubjectVectorPage = ({children, Visualiser=SubjectVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for subject
            actionParams={actionParams} 
            asyncAction={SubjectReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}