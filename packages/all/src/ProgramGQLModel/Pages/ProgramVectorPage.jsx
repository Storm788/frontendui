import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { ProgramReadPageAsyncAction } from "../Queries"
import { ProgramMediumCard } from "../Components"

/**
 * Visualizes a list of program entities using ProgramMediumCard.
 *
 * This component receives an array of program objects via the `items` prop
 * and renders a `ProgramMediumCard` for each item. Each card is keyed by the program's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of program entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of ProgramMediumCard components.
 *
 * @example
 * const programs = [
 *   { id: 1, name: "Program 1", ... },
 *   { id: 2, name: "Program 2", ... }
 * ];
 *
 * <ProgramVisualiser items={programs} />
 */
const ProgramVisualiser = ({items}) => {
    return (
        <>
            {items.map(program => (
                <ProgramMediumCard key={program.id} program={program} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of program entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting programs using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=ProgramVisualiser] - 
 *   Optional component used to visualize the loaded programs. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized programs.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display programs filtered by a `where` clause passed in the URL, e.g.:
 * //   /program?where={"name":"Example"}
 * <ProgramVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <ProgramVectorPage Visualiser={CustomProgramList}>
 *   <Footer />
 * </ProgramVectorPage>
 */
export const ProgramVectorPage = ({children, Visualiser=ProgramVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for program
            actionParams={actionParams} 
            asyncAction={ProgramReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}