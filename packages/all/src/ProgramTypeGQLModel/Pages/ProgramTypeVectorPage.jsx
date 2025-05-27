import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { ProgramTypeReadPageAsyncAction } from "../Queries"
import { ProgramTypeMediumCard } from "../Components"

/**
 * Visualizes a list of programtype entities using ProgramTypeMediumCard.
 *
 * This component receives an array of programtype objects via the `items` prop
 * and renders a `ProgramTypeMediumCard` for each item. Each card is keyed by the programtype's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of programtype entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of ProgramTypeMediumCard components.
 *
 * @example
 * const programtypes = [
 *   { id: 1, name: "ProgramType 1", ... },
 *   { id: 2, name: "ProgramType 2", ... }
 * ];
 *
 * <ProgramTypeVisualiser items={programtypes} />
 */
const ProgramTypeVisualiser = ({items}) => {
    return (
        <>
            {items.map(programtype => (
                <ProgramTypeMediumCard key={programtype.id} programtype={programtype} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of programtype entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting programtypes using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=ProgramTypeVisualiser] - 
 *   Optional component used to visualize the loaded programtypes. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized programtypes.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display programtypes filtered by a `where` clause passed in the URL, e.g.:
 * //   /programtype?where={"name":"Example"}
 * <ProgramTypeVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <ProgramTypeVectorPage Visualiser={CustomProgramTypeList}>
 *   <Footer />
 * </ProgramTypeVectorPage>
 */
export const ProgramTypeVectorPage = ({children, Visualiser=ProgramTypeVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for programtype
            actionParams={actionParams} 
            asyncAction={ProgramTypeReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}