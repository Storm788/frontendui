import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { RoleCardCapsule } from "./RoleCardCapsule"
import { RoleMediumCard } from "./RoleMediumCard"

/**
 * A large card component for displaying detailed content and layout for an role entity.
 *
 * This component wraps an `RoleCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `RoleMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the RoleLargeCard component.
 * @param {Object} props.role - The object representing the role entity.
 * @param {string|number} props.role.id - The unique identifier for the role entity.
 * @param {string} props.role.name - The name or label of the role entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const roleEntity = { id: 123, name: "Sample Entity" };
 * 
 * <RoleLargeCard role={roleEntity}>
 *   <p>Additional content for the middle column.</p>
 * </RoleLargeCard>
 */
export const RoleLargeCard = ({role, children}) => {
    return (
        <RoleCardCapsule role={role} >
            <Row>
                <LeftColumn>
                    <RoleMediumCard role={role}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </RoleCardCapsule>
    )
}
