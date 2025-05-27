import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramFormTypeCardCapsule } from "./ProgramFormTypeCardCapsule"
import { ProgramFormTypeMediumCard } from "./ProgramFormTypeMediumCard"

/**
 * A large card component for displaying detailed content and layout for an programformtype entity.
 *
 * This component wraps an `ProgramFormTypeCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ProgramFormTypeMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ProgramFormTypeLargeCard component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {string|number} props.programformtype.id - The unique identifier for the programformtype entity.
 * @param {string} props.programformtype.name - The name or label of the programformtype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramFormTypeLargeCard programformtype={programformtypeEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ProgramFormTypeLargeCard>
 */
export const ProgramFormTypeLargeCard = ({programformtype, children}) => {
    return (
        <ProgramFormTypeCardCapsule programformtype={programformtype} >
            <Row>
                <LeftColumn>
                    <ProgramFormTypeMediumCard programformtype={programformtype}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramFormTypeCardCapsule>
    )
}
