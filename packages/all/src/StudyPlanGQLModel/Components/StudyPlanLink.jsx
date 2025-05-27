import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const StudyPlanURI = `${URIRoot}/studyplan/view/`;

/**
 * A React component that renders a `ProxyLink` to an "studyplan" entity's view page.
 *
 * The target URL is dynamically constructed using the `studyplan` object's `id`, and the link displays
 * the `studyplan` object's `name` as its clickable content.
 *
 * @function StudyPlanLink
 * @param {Object} props - The properties for the `StudyPlanLink` component.
 * @param {Object} props.studyplan - The object representing the "studyplan" entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the "studyplan" entity. Used to construct the target URL.
 * @param {string} props.studyplan.name - The display name for the "studyplan" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "studyplan" entity's view page.
 *
 * @example
 * // Example usage with a sample studyplan entity:
 * const studyplanEntity = { id: 123, name: "Example StudyPlan Entity" };
 * 
 * <StudyPlanLink studyplan={studyplanEntity} />
 * // Renders: <ProxyLink to="/studyplan/studyplan/view/123">Example StudyPlan Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/studyplan/studyplan/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const StudyPlanLink = ({studyplan, ...props}) => {
    return <ProxyLink to={StudyPlanURI + studyplan.id} {...props}>{studyplan?.name || studyplan?.event?.name || studyplan?.id}</ProxyLink>
}