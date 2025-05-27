import { LessonTypeLargeCard } from "../Components"
import { LessonTypePageNavbar } from "./LessonTypePageNavbar"

/**
 * Renders a page layout for a single lessontype entity, including navigation and detailed view.
 *
 * This component wraps `LessonTypePageNavbar` and `LessonTypeLargeCard` to provide a consistent
 * interface for displaying an individual lessontype. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.lessontype - The lessontype entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a lessontype.
 *
 * @example
 * const lessontype = { id: 1, name: "Example LessonType" };
 * <LessonTypePageContent lessontype={lessontype}>
 *   <p>Additional info here.</p>
 * </LessonTypePageContent>
 */
export const LessonTypePageContent = ({lessontype, children, ...props}) => {
    return (<>
        <LessonTypePageNavbar lessontype={lessontype} />
        <LessonTypeLargeCard lessontype={lessontype} {...props} >
            LessonType {JSON.stringify(lessontype)}
            {children}
        </LessonTypeLargeCard>
    </>)
}