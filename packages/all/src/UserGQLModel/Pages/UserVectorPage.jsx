import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { UserReadPageAsyncAction } from "../Queries"
import { UserMediumCard } from "../Components"

/**
 * Visualizes a list of user entities using UserMediumCard.
 *
 * This component receives an array of user objects via the `items` prop
 * and renders a `UserMediumCard` for each item. Each card is keyed by the user's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of user entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of UserMediumCard components.
 *
 * @example
 * const users = [
 *   { id: 1, name: "User 1", ... },
 *   { id: 2, name: "User 2", ... }
 * ];
 *
 * <UserVisualiser items={users} />
 */
const UserVisualiser = ({items}) => {
    return (
        <>
            {items.map(user => (
                <UserMediumCard key={user.id} user={user} />
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of user entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting users using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=UserVisualiser] - 
 *   Optional component used to visualize the loaded users. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized users.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display users filtered by a `where` clause passed in the URL, e.g.:
 * //   /user?where={"name":"Example"}
 * <UserVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <UserVectorPage Visualiser={CustomUserList}>
 *   <Footer />
 * </UserVectorPage>
 */
export const UserVectorPage = ({children, Visualiser=UserVisualiser}) => {
    const { search } = useLocation();
    let actionParams = {};
    try {
        const params = new URLSearchParams(search);
        const where = params.get('where');        
        actionParams.where = where ? JSON.parse(where) : undefined;
    } catch (e) {
        console.warn("Invalid 'where' query parameter!", e);
    }
    return (<>
        <MyNavbar onSearchChange={onSearchChange} />
        <InfiniteScroll
            actionParams={actionParams} 
            asyncAction={UserReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        {children}
    </>)
}