import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
import { URIRoot } from "../../uriroot";

export const StateMachineURI = `${URIRoot}/statemachine/view/`;

/**
 * A React component that renders a `ProxyLink` to an "statemachine" entity's view page.
 *
 * The target URL is dynamically constructed using the `statemachine` object's `id`, and the link displays
 * the `statemachine` object's `name` as its clickable content.
 *
 * @function StateMachineLink
 * @param {Object} props - The properties for the `StateMachineLink` component.
 * @param {Object} props.statemachine - The object representing the "statemachine" entity.
 * @param {string|number} props.statemachine.id - The unique identifier for the "statemachine" entity. Used to construct the target URL.
 * @param {string} props.statemachine.name - The display name for the "statemachine" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "statemachine" entity's view page.
 *
 * @example
 * // Example usage with a sample statemachine entity:
 * const statemachineEntity = { id: 123, name: "Example StateMachine Entity" };
 * 
 * <StateMachineLink statemachine={statemachineEntity} />
 * // Renders: <ProxyLink to="/statemachine/statemachine/view/123">Example StateMachine Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/statemachine/statemachine/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const StateMachineLink = ({statemachine, ...props}) => {
    return <ProxyLink to={StateMachineURI + statemachine.id} {...props}>{statemachine.name}</ProxyLink>
}