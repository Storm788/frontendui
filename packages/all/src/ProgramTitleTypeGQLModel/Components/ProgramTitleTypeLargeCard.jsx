import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramTitleTypeCardCapsule } from "./ProgramTitleTypeCardCapsule"
import { ProgramTitleTypeMediumCard } from "./ProgramTitleTypeMediumCard"

/**
 * A large card component for displaying detailed content and layout for an programtitletype entity.
 *
 * This component wraps an `ProgramTitleTypeCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ProgramTitleTypeMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ProgramTitleTypeLargeCard component.
 * @param {Object} props.programtitletype - The object representing the programtitletype entity.
 * @param {string|number} props.programtitletype.id - The unique identifier for the programtitletype entity.
 * @param {string} props.programtitletype.name - The name or label of the programtitletype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const programtitletypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramTitleTypeLargeCard programtitletype={programtitletypeEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ProgramTitleTypeLargeCard>
 */
export const ProgramTitleTypeLargeCard = ({programtitletype, children}) => {
    return (
        <ProgramTitleTypeCardCapsule programtitletype={programtitletype} >
            <Row>
                <LeftColumn>
                    <ProgramTitleTypeMediumCard programtitletype={programtitletype}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramTitleTypeCardCapsule>
    )
}
