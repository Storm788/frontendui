import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { AdmissionLink } from "./AdmissionLink"

/**
 * A specialized card component that displays an `AdmissionLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `AdmissionLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `admission` object.
 *
 * @component
 * @param {Object} props - The props for the AdmissionCardCapsule component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {string|number} props.admission.id - The unique identifier for the admission entity.
 * @param {string} props.admission.name - The display name for the admission entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { AdmissionCardCapsule } from './AdmissionCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const admissionEntity = { id: 123, name: "Example Entity" };
 *
 * <AdmissionCardCapsule admission={admissionEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </AdmissionCardCapsule>
 */
export const AdmissionCardCapsule = ({admission, children, title=<><PersonFill /> <AdmissionLink admission={admission} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
