import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { FacilityCardCapsule } from "./FacilityCardCapsule"
import { FacilityMediumCard } from "./FacilityMediumCard"

/**
 * A large card component for displaying detailed content and layout for an facility entity.
 *
 * This component wraps an `FacilityCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `FacilityMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the FacilityLargeCard component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {string|number} props.facility.id - The unique identifier for the facility entity.
 * @param {string} props.facility.name - The name or label of the facility entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FacilityLargeCard facility={facilityEntity}>
 *   <p>Additional content for the middle column.</p>
 * </FacilityLargeCard>
 */
export const FacilityLargeCard = ({facility, children}) => {
    return (
        <FacilityCardCapsule facility={facility} >
            <Row>
                <LeftColumn>
                    <FacilityMediumCard facility={facility}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </FacilityCardCapsule>
    )
}
