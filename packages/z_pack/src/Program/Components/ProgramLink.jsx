import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const ProgramURI = '/program/program/view/';

/**
 * A React component that renders a `ProxyLink` to an "program" entity's view page.
 *
 * The target URL is dynamically constructed using the `program` object's `id`, and the link displays
 * the `program` object's `name` as its clickable content.
 *
 * @function ProgramLink
 * @param {Object} props - The properties for the `ProgramLink` component.
 * @param {Object} props.program - The object representing the "program" entity.
 * @param {string|number} props.program.id - The unique identifier for the "program" entity. Used to construct the target URL.
 * @param {string} props.program.name - The display name for the "program" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "program" entity's view page.
 *
 * @example
 * // Example usage with a sample program entity:
 * const programEntity = { id: 123, name: "Example Program Entity" };
 * 
 * <ProgramLink program={programEntity} />
 * // Renders: <ProxyLink to="/program/program/view/123">Example Program Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/program/program/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ProgramLink = ({program}) => {
    return <ProxyLink to={ProgramURI + program.id}>{program.name}</ProxyLink>
}