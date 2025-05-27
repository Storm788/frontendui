import { AdmissionButton, AdmissionLargeCard, AdmissionMediumEditableContent } from "../Components"
import { AdmissionLiveEdit } from "../Components/AdmissionLiveEdit"
import { AdmissionPageNavbar } from "./AdmissionPageNavbar"

/**
 * Renders a page layout for a single admission entity, including navigation and detailed view.
 *
 * This component wraps `AdmissionPageNavbar` and `AdmissionLargeCard` to provide a consistent
 * interface for displaying an individual admission. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.admission - The admission entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a admission.
 *
 * @example
 * const admission = { id: 1, name: "Example Admission" };
 * <AdmissionPageContent admission={admission}>
 *   <p>Additional info here.</p>
 * </AdmissionPageContent>
 */
export const AdmissionPageContent = ({admission, children, ...props}) => {
    return (<>
        <AdmissionPageNavbar admission={admission} />
        <AdmissionLargeCard admission={admission} {...props} >
            {/* <AdmissionMediumEditableContent admission={admission} /> */}
            <AdmissionButton className="btn btn-success" operation="U" admission={admission}>Upravit</AdmissionButton>
            {/* Admission {JSON.stringify(admission)} */}
            <AdmissionLiveEdit admission={admission} />
            {children}
        </AdmissionLargeCard>
    </>)
}