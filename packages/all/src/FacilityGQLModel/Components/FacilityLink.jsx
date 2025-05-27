import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const FacilityURI = `${URIRoot}/facility/view/`;

/**
 * A React component that renders a `ProxyLink` to an "facility" entity's view page.
 *
 * The target URL is dynamically constructed using the `facility` object's `id`, and the link displays
 * the `facility` object's `name` as its clickable content.
 *
 * @function FacilityLink
 * @param {Object} props - The properties for the `FacilityLink` component.
 * @param {Object} props.facility - The object representing the "facility" entity.
 * @param {string|number} props.facility.id - The unique identifier for the "facility" entity. Used to construct the target URL.
 * @param {string} props.facility.name - The display name for the "facility" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "facility" entity's view page.
 *
 * @example
 * // Example usage with a sample facility entity:
 * const facilityEntity = { id: 123, name: "Example Facility Entity" };
 * 
 * <FacilityLink facility={facilityEntity} />
 * // Renders: <ProxyLink to="/facility/facility/view/123">Example Facility Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/facility/facility/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const FacilityLink = ({facility, ...props}) => {
    return <ProxyLink to={FacilityURI + facility.id} {...props}>{facility?.name || facility?.id}</ProxyLink>
}