import { StudyPlanLessonLargeCard } from "../Components"
import { StudyPlanLessonPageNavbar } from "./StudyPlanLessonPageNavbar"

/**
 * Renders a page layout for a single studyplanlesson entity, including navigation and detailed view.
 *
 * This component wraps `StudyPlanLessonPageNavbar` and `StudyPlanLessonLargeCard` to provide a consistent
 * interface for displaying an individual studyplanlesson. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.studyplanlesson - The studyplanlesson entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a studyplanlesson.
 *
 * @example
 * const studyplanlesson = { id: 1, name: "Example StudyPlanLesson" };
 * <StudyPlanLessonPageContent studyplanlesson={studyplanlesson}>
 *   <p>Additional info here.</p>
 * </StudyPlanLessonPageContent>
 */
export const StudyPlanLessonPageContent = ({studyplanlesson, children, ...props}) => {
    return (<>
        <StudyPlanLessonPageNavbar studyplanlesson={studyplanlesson} />
        <StudyPlanLessonLargeCard studyplanlesson={studyplanlesson} {...props} >
            StudyPlanLesson {JSON.stringify(studyplanlesson)}
            {children}
        </StudyPlanLessonLargeCard>
    </>)
}