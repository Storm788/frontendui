import { SubjectLargeCard } from "../Components"
import { SubjectPageNavbar } from "./SubjectPageNavbar"
import { SubjectSemestersAttribute } from "../Vectors/SubjectSemestersAttribute"
/**
 * Renders a page layout for a single subject entity, including navigation and detailed view.
 *
 * This component wraps `SubjectPageNavbar` and `SubjectLargeCard` to provide a consistent
 * interface for displaying an individual subject. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.subject - The subject entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a subject.
 *
 * @example
 * const subject = { id: 1, name: "Example Subject" };
 * <SubjectPageContent subject={subject}>
 *   <p>Additional info here.</p>
 * </SubjectPageContent>
 */
export const SubjectPageContent = ({subject, children, ...props}) => {
    return (<>
        <SubjectPageNavbar subject={subject} />
        <SubjectLargeCard subject={subject} {...props} >
            {/* Subject {JSON.stringify(subject)} */}
            <SubjectSemestersAttribute subject={subject} />
            {children}
        </SubjectLargeCard>
    </>)
}