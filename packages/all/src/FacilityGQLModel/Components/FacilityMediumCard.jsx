import { PersonFill } from "react-bootstrap-icons"
import { FacilityLink } from "./FacilityLink"
import { FacilityCardCapsule } from "./FacilityCardCapsule"
import { FacilityMediumContent } from "./FacilityMediumContent"

/**
 * A card component that displays detailed content for an facility entity.
 *
 * This component combines `FacilityCardCapsule` and `FacilityMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the facility entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the FacilityMediumCard component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {string|number} props.facility.id - The unique identifier for the facility entity.
 * @param {string} props.facility.name - The name or label of the facility entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FacilityMediumCard facility={facilityEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </FacilityMediumCard>
 */
export const FacilityMediumCard = ({facility, children}) => {
    return (
        <FacilityCardCapsule title={<><PersonFill /> <FacilityLink facility={facility} /></>}>
            <FacilityMediumContent facility={facility}>
                {children}
            </FacilityMediumContent>
        </FacilityCardCapsule>
    )
}
