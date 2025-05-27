import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { FacilityLink } from "./FacilityLink"

/**
 * A specialized card component that displays an `FacilityLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `FacilityLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `facility` object.
 *
 * @component
 * @param {Object} props - The props for the FacilityCardCapsule component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {string|number} props.facility.id - The unique identifier for the facility entity.
 * @param {string} props.facility.name - The display name for the facility entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { FacilityCardCapsule } from './FacilityCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const facilityEntity = { id: 123, name: "Example Entity" };
 *
 * <FacilityCardCapsule facility={facilityEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </FacilityCardCapsule>
 */
export const FacilityCardCapsule = ({facility, children, title=<><PersonFill /> <FacilityLink facility={facility} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
