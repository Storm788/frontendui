import { StudentLargeCard } from "../Components"
import { StudentPageNavbar } from "./StudentPageNavbar"

/**
 * Renders a page layout for a single student entity, including navigation and detailed view.
 *
 * This component wraps `StudentPageNavbar` and `StudentLargeCard` to provide a consistent
 * interface for displaying an individual student. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.student - The student entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a student.
 *
 * @example
 * const student = { id: 1, name: "Example Student" };
 * <StudentPageContent student={student}>
 *   <p>Additional info here.</p>
 * </StudentPageContent>
 */
export const StudentPageContent = ({student, children, ...props}) => {
    return (<>
        <StudentPageNavbar student={student} />
        <StudentLargeCard student={student} {...props} >
            Student {JSON.stringify(student)}
            {children}
        </StudentLargeCard>
    </>)
}