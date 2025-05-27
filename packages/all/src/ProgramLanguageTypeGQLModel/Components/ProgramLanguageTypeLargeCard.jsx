import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramLanguageTypeCardCapsule } from "./ProgramLanguageTypeCardCapsule"
import { ProgramLanguageTypeMediumCard } from "./ProgramLanguageTypeMediumCard"

/**
 * A large card component for displaying detailed content and layout for an programlanguagetype entity.
 *
 * This component wraps an `ProgramLanguageTypeCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ProgramLanguageTypeMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ProgramLanguageTypeLargeCard component.
 * @param {Object} props.programlanguagetype - The object representing the programlanguagetype entity.
 * @param {string|number} props.programlanguagetype.id - The unique identifier for the programlanguagetype entity.
 * @param {string} props.programlanguagetype.name - The name or label of the programlanguagetype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const programlanguagetypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramLanguageTypeLargeCard programlanguagetype={programlanguagetypeEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ProgramLanguageTypeLargeCard>
 */
export const ProgramLanguageTypeLargeCard = ({programlanguagetype, children}) => {
    return (
        <ProgramLanguageTypeCardCapsule programlanguagetype={programlanguagetype} >
            <Row>
                <LeftColumn>
                    <ProgramLanguageTypeMediumCard programlanguagetype={programlanguagetype}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramLanguageTypeCardCapsule>
    )
}
