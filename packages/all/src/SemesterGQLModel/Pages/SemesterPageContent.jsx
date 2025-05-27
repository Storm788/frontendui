import { SemesterLargeCard } from "../Components"
import { SemesterPageNavbar } from "./SemesterPageNavbar"

/**
 * Renders a page layout for a single semester entity, including navigation and detailed view.
 *
 * This component wraps `SemesterPageNavbar` and `SemesterLargeCard` to provide a consistent
 * interface for displaying an individual semester. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.semester - The semester entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a semester.
 *
 * @example
 * const semester = { id: 1, name: "Example Semester" };
 * <SemesterPageContent semester={semester}>
 *   <p>Additional info here.</p>
 * </SemesterPageContent>
 */
export const SemesterPageContent = ({semester, children, ...props}) => {
    return (<>
        <SemesterPageNavbar semester={semester} />
        <SemesterLargeCard semester={semester} {...props} >
            Semester {JSON.stringify(semester)}
            {children}
        </SemesterLargeCard>
    </>)
}