import { HashContainer } from "@hrbolek/uoisfrontend-shared"
import { UserLargeCard } from "../Components"
import { UserMembershipsAttribute } from "../Vectors/UserMembershipsAttribute"
import { UserPageNavbar } from "./UserPageNavbar"

/**
 * Renders a page layout for a single user entity, including navigation and detailed view.
 *
 * This component wraps `UserPageNavbar` and `UserLargeCard` to provide a consistent
 * interface for displaying an individual user. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.user - The user entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a user.
 *
 * @example
 * const user = { id: 1, name: "Example User" };
 * <UserPageContent user={user}>
 *   <p>Additional info here.</p>
 * </UserPageContent>
 */
export const UserPageContent = ({user, children, ...props}) => {
    return (<>
        <UserPageNavbar user={user} />
        <UserLargeCard user={user} {...props} >
            <HashContainer firstAsDefault={true}>
                <UserMembershipsAttribute id="administration" user={user} />
            </HashContainer>
            User {JSON.stringify(user)}
            {children}
        </UserLargeCard>
    </>)
}