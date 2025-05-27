import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { ProgramLevelTypeReadPageAsyncAction } from "../Queries"
import { ProgramLevelTypeMediumCard } from "../Components"

/**
 * Visualizes a list of programleveltype entities using ProgramLevelTypeMediumCard.
 *
 * This component receives an array of programleveltype objects via the `items` prop
 * and renders a `ProgramLevelTypeMediumCard` for each item. Each card is keyed by the programleveltype's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of programleveltype entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of ProgramLevelTypeMediumCard components.
 *
 * @example
 * const programleveltypes = [
 *   { id: 1, name: "ProgramLevelType 1", ... },
 *   { id: 2, name: "ProgramLevelType 2", ... }
 * ];
 *
 * <ProgramLevelTypeVisualiser items={programleveltypes} />
 */
const ProgramLevelTypeVisualiser = ({items}) => {
    return (
        <>
            {items.map(programleveltype => (
                <ProgramLevelTypeMediumCard key={programleveltype.id} programleveltype={programleveltype} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of programleveltype entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting programleveltypes using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=ProgramLevelTypeVisualiser] - 
 *   Optional component used to visualize the loaded programleveltypes. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized programleveltypes.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display programleveltypes filtered by a `where` clause passed in the URL, e.g.:
 * //   /programleveltype?where={"name":"Example"}
 * <ProgramLevelTypeVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <ProgramLevelTypeVectorPage Visualiser={CustomProgramLevelTypeList}>
 *   <Footer />
 * </ProgramLevelTypeVectorPage>
 */
export const ProgramLevelTypeVectorPage = ({children, Visualiser=ProgramLevelTypeVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for programleveltype
            actionParams={actionParams} 
            asyncAction={ProgramLevelTypeReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}