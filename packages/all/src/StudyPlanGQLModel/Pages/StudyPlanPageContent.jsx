import { StudyPlanLargeCard } from "../Components"
import { StudyPlanPageNavbar } from "./StudyPlanPageNavbar"

/**
 * Renders a page layout for a single studyplan entity, including navigation and detailed view.
 *
 * This component wraps `StudyPlanPageNavbar` and `StudyPlanLargeCard` to provide a consistent
 * interface for displaying an individual studyplan. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.studyplan - The studyplan entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a studyplan.
 *
 * @example
 * const studyplan = { id: 1, name: "Example StudyPlan" };
 * <StudyPlanPageContent studyplan={studyplan}>
 *   <p>Additional info here.</p>
 * </StudyPlanPageContent>
 */
export const StudyPlanPageContent = ({studyplan, children, ...props}) => {
    return (<>
        <StudyPlanPageNavbar studyplan={studyplan} />
        <StudyPlanLargeCard studyplan={studyplan} {...props} >
            {/* StudyPlan {JSON.stringify(studyplan)} */}
            {children}
        </StudyPlanLargeCard>
    </>)
}