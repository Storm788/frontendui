import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramTypeCardCapsule } from "./ProgramTypeCardCapsule"
import { ProgramTypeMediumCard } from "./ProgramTypeMediumCard"

/**
 * A large card component for displaying detailed content and layout for an programtype entity.
 *
 * This component wraps an `ProgramTypeCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ProgramTypeMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ProgramTypeLargeCard component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {string|number} props.programtype.id - The unique identifier for the programtype entity.
 * @param {string} props.programtype.name - The name or label of the programtype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramTypeLargeCard programtype={programtypeEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ProgramTypeLargeCard>
 */
export const ProgramTypeLargeCard = ({programtype, children}) => {
    return (
        <ProgramTypeCardCapsule programtype={programtype} >
            <Row>
                <LeftColumn>
                    <ProgramTypeMediumCard programtype={programtype}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramTypeCardCapsule>
    )
}
