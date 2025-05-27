import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { FacilityReadPageAsyncAction } from "../Queries"
import { FacilityMediumCard } from "../Components"

/**
 * Visualizes a list of facility entities using FacilityMediumCard.
 *
 * This component receives an array of facility objects via the `items` prop
 * and renders a `FacilityMediumCard` for each item. Each card is keyed by the facility's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of facility entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of FacilityMediumCard components.
 *
 * @example
 * const facilitys = [
 *   { id: 1, name: "Facility 1", ... },
 *   { id: 2, name: "Facility 2", ... }
 * ];
 *
 * <FacilityVisualiser items={facilitys} />
 */
const FacilityVisualiser = ({items}) => {
    return (
        <>
            {items.map(facility => (
                <FacilityMediumCard key={facility.id} facility={facility} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of facility entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting facilitys using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=FacilityVisualiser] - 
 *   Optional component used to visualize the loaded facilitys. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized facilitys.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display facilitys filtered by a `where` clause passed in the URL, e.g.:
 * //   /facility?where={"name":"Example"}
 * <FacilityVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <FacilityVectorPage Visualiser={CustomFacilityList}>
 *   <Footer />
 * </FacilityVectorPage>
 */
export const FacilityVectorPage = ({children, Visualiser=FacilityVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for facility
            actionParams={actionParams} 
            asyncAction={FacilityReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}