import { FacilityLargeCard } from "../Components"
import { FacilityPageNavbar } from "./FacilityPageNavbar"

/**
 * Renders a page layout for a single facility entity, including navigation and detailed view.
 *
 * This component wraps `FacilityPageNavbar` and `FacilityLargeCard` to provide a consistent
 * interface for displaying an individual facility. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.facility - The facility entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a facility.
 *
 * @example
 * const facility = { id: 1, name: "Example Facility" };
 * <FacilityPageContent facility={facility}>
 *   <p>Additional info here.</p>
 * </FacilityPageContent>
 */
export const FacilityPageContent = ({facility, children, ...props}) => {
    return (<>
        <FacilityPageNavbar facility={facility} />
        <FacilityLargeCard facility={facility} {...props} >
            Facility {JSON.stringify(facility)}
            {children}
        </FacilityLargeCard>
    </>)
}