import { LessonLargeCard } from "../Components"
import { LessonPageNavbar } from "./LessonPageNavbar"

/**
 * Renders a page layout for a single lesson entity, including navigation and detailed view.
 *
 * This component wraps `LessonPageNavbar` and `LessonLargeCard` to provide a consistent
 * interface for displaying an individual lesson. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.lesson - The lesson entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a lesson.
 *
 * @example
 * const lesson = { id: 1, name: "Example Lesson" };
 * <LessonPageContent lesson={lesson}>
 *   <p>Additional info here.</p>
 * </LessonPageContent>
 */
export const LessonPageContent = ({lesson, children, ...props}) => {
    return (<>
        <LessonPageNavbar lesson={lesson} />
        <LessonLargeCard lesson={lesson} {...props} >
            Lesson {JSON.stringify(lesson)}
            {children}
        </LessonLargeCard>
    </>)
}