import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StudyPlanCardCapsule } from "./StudyPlanCardCapsule"
import { StudyPlanMediumCard } from "./StudyPlanMediumCard"

/**
 * A large card component for displaying detailed content and layout for an studyplan entity.
 *
 * This component wraps an `StudyPlanCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StudyPlanMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StudyPlanLargeCard component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the studyplan entity.
 * @param {string} props.studyplan.name - The name or label of the studyplan entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyPlanLargeCard studyplan={studyplanEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StudyPlanLargeCard>
 */
export const StudyPlanLargeCard = ({studyplan, children}) => {
    return (
        <StudyPlanCardCapsule studyplan={studyplan} >
            <Row>
                <LeftColumn>
                    <StudyPlanMediumCard studyplan={studyplan}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StudyPlanCardCapsule>
    )
}
