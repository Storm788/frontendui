import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramLevelTypeCardCapsule } from "./ProgramLevelTypeCardCapsule"
import { ProgramLevelTypeMediumCard } from "./ProgramLevelTypeMediumCard"

/**
 * A large card component for displaying detailed content and layout for an programleveltype entity.
 *
 * This component wraps an `ProgramLevelTypeCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ProgramLevelTypeMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ProgramLevelTypeLargeCard component.
 * @param {Object} props.programleveltype - The object representing the programleveltype entity.
 * @param {string|number} props.programleveltype.id - The unique identifier for the programleveltype entity.
 * @param {string} props.programleveltype.name - The name or label of the programleveltype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const programleveltypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramLevelTypeLargeCard programleveltype={programleveltypeEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ProgramLevelTypeLargeCard>
 */
export const ProgramLevelTypeLargeCard = ({programleveltype, children}) => {
    return (
        <ProgramLevelTypeCardCapsule programleveltype={programleveltype} >
            <Row>
                <LeftColumn>
                    <ProgramLevelTypeMediumCard programleveltype={programleveltype}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramLevelTypeCardCapsule>
    )
}
