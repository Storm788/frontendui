import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { StudentReadPageAsyncAction } from "../Queries"
import { StudentMediumCard } from "../Components"

/**
 * Visualizes a list of student entities using StudentMediumCard.
 *
 * This component receives an array of student objects via the `items` prop
 * and renders a `StudentMediumCard` for each item. Each card is keyed by the student's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of student entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of StudentMediumCard components.
 *
 * @example
 * const students = [
 *   { id: 1, name: "Student 1", ... },
 *   { id: 2, name: "Student 2", ... }
 * ];
 *
 * <StudentVisualiser items={students} />
 */
const StudentVisualiser = ({items}) => {
    return (
        <>
            {items.map(student => (
                <StudentMediumCard key={student.id} student={student} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of student entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting students using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=StudentVisualiser] - 
 *   Optional component used to visualize the loaded students. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized students.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display students filtered by a `where` clause passed in the URL, e.g.:
 * //   /student?where={"name":"Example"}
 * <StudentVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <StudentVectorPage Visualiser={CustomStudentList}>
 *   <Footer />
 * </StudentVectorPage>
 */
export const StudentVectorPage = ({children, Visualiser=StudentVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for student
            actionParams={actionParams} 
            asyncAction={StudentReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}