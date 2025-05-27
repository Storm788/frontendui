import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { ProgramTitleTypeReadPageAsyncAction } from "../Queries"
import { ProgramTitleTypeMediumCard } from "../Components"

/**
 * Visualizes a list of programtitletype entities using ProgramTitleTypeMediumCard.
 *
 * This component receives an array of programtitletype objects via the `items` prop
 * and renders a `ProgramTitleTypeMediumCard` for each item. Each card is keyed by the programtitletype's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of programtitletype entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of ProgramTitleTypeMediumCard components.
 *
 * @example
 * const programtitletypes = [
 *   { id: 1, name: "ProgramTitleType 1", ... },
 *   { id: 2, name: "ProgramTitleType 2", ... }
 * ];
 *
 * <ProgramTitleTypeVisualiser items={programtitletypes} />
 */
const ProgramTitleTypeVisualiser = ({items}) => {
    return (
        <>
            {items.map(programtitletype => (
                <ProgramTitleTypeMediumCard key={programtitletype.id} programtitletype={programtitletype} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of programtitletype entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting programtitletypes using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=ProgramTitleTypeVisualiser] - 
 *   Optional component used to visualize the loaded programtitletypes. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized programtitletypes.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display programtitletypes filtered by a `where` clause passed in the URL, e.g.:
 * //   /programtitletype?where={"name":"Example"}
 * <ProgramTitleTypeVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <ProgramTitleTypeVectorPage Visualiser={CustomProgramTitleTypeList}>
 *   <Footer />
 * </ProgramTitleTypeVectorPage>
 */
export const ProgramTitleTypeVectorPage = ({children, Visualiser=ProgramTitleTypeVisualiser}) => {
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
            preloadedItems={[]} // No preloaded items for programtitletype
            actionParams={actionParams} 
            asyncAction={ProgramTitleTypeReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}