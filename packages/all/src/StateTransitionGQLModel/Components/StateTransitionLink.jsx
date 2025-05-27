import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const StateTransitionURI = `${URIRoot}/statetransition/view/`;

/**
 * A React component that renders a `ProxyLink` to an "statetransition" entity's view page.
 *
 * The target URL is dynamically constructed using the `statetransition` object's `id`, and the link displays
 * the `statetransition` object's `name` as its clickable content.
 *
 * @function StateTransitionLink
 * @param {Object} props - The properties for the `StateTransitionLink` component.
 * @param {Object} props.statetransition - The object representing the "statetransition" entity.
 * @param {string|number} props.statetransition.id - The unique identifier for the "statetransition" entity. Used to construct the target URL.
 * @param {string} props.statetransition.name - The display name for the "statetransition" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "statetransition" entity's view page.
 *
 * @example
 * // Example usage with a sample statetransition entity:
 * const statetransitionEntity = { id: 123, name: "Example StateTransition Entity" };
 * 
 * <StateTransitionLink statetransition={statetransitionEntity} />
 * // Renders: <ProxyLink to="/statetransition/statetransition/view/123">Example StateTransition Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/statetransition/statetransition/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const StateTransitionLink = ({statetransition, ...props}) => {
    return <ProxyLink to={StateTransitionURI + statetransition.id} {...props}>{statetransition.name}</ProxyLink>
}