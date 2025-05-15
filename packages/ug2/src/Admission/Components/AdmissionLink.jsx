import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const AdmissionURI = `/admission/admission/view/`;

/**
 * A React component that renders a `ProxyLink` to an "admission" entity's view page.
 *
 * The target URL is dynamically constructed using the `admission` object's `id`, and the link displays
 * the `admission` object's `name` as its clickable content.
 *
 * @function AdmissionLink
 * @param {Object} props - The properties for the `AdmissionLink` component.
 * @param {Object} props.admission - The object representing the "admission" entity.
 * @param {string|number} props.admission.id - The unique identifier for the "admission" entity. Used to construct the target URL.
 * @param {string} props.admission.name - The display name for the "admission" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "admission" entity's view page.
 *
 * @example
 * // Example usage with a sample admission entity:
 * const admissionEntity = { id: 123, name: "Example Admission Entity" };
 * 
 * <AdmissionLink admission={admissionEntity} />
 * // Renders: <ProxyLink to="/admission/admission/view/123">Example Admission Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/admission/admission/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const AdmissionLink = ({admission, ...props}) => {
    return <ProxyLink to={AdmissionURI + admission.id} {...props}>{admission.name}</ProxyLink>
}