import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { GroupCardCapsule } from "./GroupCardCapsule"
import { GroupMediumCard } from "./GroupMediumCard"

/**
 * A large card component for displaying detailed content and layout for an group entity.
 *
 * This component wraps an `GroupCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `GroupMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the GroupLargeCard component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The name or label of the group entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const groupEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GroupLargeCard group={groupEntity}>
 *   <p>Additional content for the middle column.</p>
 * </GroupLargeCard>
 */
export const GroupLargeCard = ({group, children}) => {
    return (
        <GroupCardCapsule group={group} >
            <Row>
                <LeftColumn>
                    <GroupMediumCard group={group}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </GroupCardCapsule>
    )
}
