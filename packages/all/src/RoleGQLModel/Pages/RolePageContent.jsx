import { RoleLargeCard } from "../Components"
import { RolePageNavbar } from "./RolePageNavbar"

/**
 * Renders a page layout for a single role entity, including navigation and detailed view.
 *
 * This component wraps `RolePageNavbar` and `RoleLargeCard` to provide a consistent
 * interface for displaying an individual role. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.role - The role entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a role.
 *
 * @example
 * const role = { id: 1, name: "Example Role" };
 * <RolePageContent role={role}>
 *   <p>Additional info here.</p>
 * </RolePageContent>
 */
export const RolePageContent = ({role, children, ...props}) => {
    return (<>
        <RolePageNavbar role={role} />
        <RoleLargeCard role={role} {...props} >
            Role {JSON.stringify(role)}
            {children}
        </RoleLargeCard>
    </>)
}