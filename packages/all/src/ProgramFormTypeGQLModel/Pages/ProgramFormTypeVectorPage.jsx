import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { ProgramFormTypeReadPageAsyncAction } from "../Queries"
import { ProgramFormTypeMediumCard } from "../Components"

/**
 * Visualizes a list of programformtype entities using ProgramFormTypeMediumCard.
 *
 * This component receives an array of programformtype objects via the `items` prop
 * and renders a `ProgramFormTypeMediumCard` for each item. Each card is keyed by the programformtype's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of programformtype entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of ProgramFormTypeMediumCard components.
 *
 * @example
 * const programformtypes = [
 *   { id: 1, name: "ProgramFormType 1", ... },
 *   { id: 2, name: "ProgramFormType 2", ... }
 * ];
 *
 * <ProgramFormTypeVisualiser items={programformtypes} />
 */
const ProgramFormTypeVisualiser = ({items}) => {
    return (
        <>
            {items.map(programformtype => (
                <ProgramFormTypeMediumCard key={programformtype.id} programformtype={programformtype} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of programformtype entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting programformtypes using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=ProgramFormTypeVisualiser] - 
 *   Optional component used to visualize the loaded programformtypes. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized programformtypes.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display programformtypes filtered by a `where` clause passed in the URL, e.g.:
 * //   /programformtype?where={"name":"Example"}
 * <ProgramFormTypeVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <ProgramFormTypeVectorPage Visualiser={CustomProgramFormTypeList}>
 *   <Footer />
 * </ProgramFormTypeVectorPage>
 */
export const ProgramFormTypeVectorPage = ({children, Visualiser=ProgramFormTypeVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for programformtype
            actionParams={actionParams} 
            asyncAction={ProgramFormTypeReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}