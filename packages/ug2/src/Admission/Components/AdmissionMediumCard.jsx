import { PersonFill } from "react-bootstrap-icons"
import { AdmissionLink } from "./AdmissionLink"
import { AdmissionCardCapsule } from "./AdmissionCardCapsule"
import { AdmissionMediumContent } from "./AdmissionMediumContent"

/**
 * A card component that displays detailed content for an admission entity.
 *
 * This component combines `AdmissionCardCapsule` and `AdmissionMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the admission entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the AdmissionMediumCard component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {string|number} props.admission.id - The unique identifier for the admission entity.
 * @param {string} props.admission.name - The name or label of the admission entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <AdmissionMediumCard admission={admissionEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </AdmissionMediumCard>
 */
export const AdmissionMediumCard = ({admission, children}) => {
    return (
        <AdmissionCardCapsule title={<><PersonFill /> <AdmissionLink admission={admission} /></>}>
            <AdmissionMediumContent admission={admission}>
                {children}
            </AdmissionMediumContent>
        </AdmissionCardCapsule>
    )
}
