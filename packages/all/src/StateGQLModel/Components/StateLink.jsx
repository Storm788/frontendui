import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const StateURI = `${URIRoot}/state/view/`;

/**
 * A React component that renders a `ProxyLink` to an "state" entity's view page.
 *
 * The target URL is dynamically constructed using the `state` object's `id`, and the link displays
 * the `state` object's `name` as its clickable content.
 *
 * @function StateLink
 * @param {Object} props - The properties for the `StateLink` component.
 * @param {Object} props.state - The object representing the "state" entity.
 * @param {string|number} props.state.id - The unique identifier for the "state" entity. Used to construct the target URL.
 * @param {string} props.state.name - The display name for the "state" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "state" entity's view page.
 *
 * @example
 * // Example usage with a sample state entity:
 * const stateEntity = { id: 123, name: "Example State Entity" };
 * 
 * <StateLink state={stateEntity} />
 * // Renders: <ProxyLink to="/state/state/view/123">Example State Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/state/state/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const StateLink = ({state, ...props}) => {
    return <ProxyLink to={StateURI + state.id} {...props}>{state.name}</ProxyLink>
}