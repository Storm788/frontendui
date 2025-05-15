import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateMachnineManagement, UserButton, UserData, UserLargeCard } from "../Components"
import { UserReadAsyncAction } from "../Queries"
import { UserPageNavbar } from "./UserPageNavbar"
import { UserGroupsAttribute } from "../Vectors/UserGroupsAttribute"

/**
 * A page content component for displaying detailed information about an user entity.
 *
 * This component utilizes `UserLargeCard` to create a structured layout and displays 
 * the serialized representation of the `user` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the UserPageContent component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {string|number} props.user.id - The unique identifier for the user entity.
 * @param {string} props.user.name - The name or label of the user entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an user entity.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 123, name: "Sample Entity" };
 * 
 * <UserPageContent user={userEntity} />
 */
const UserPageContent = ({user}) => {
    return (<>
        <UserPageNavbar user={user} />
        <UserLargeCard user={user}>
            <UserGroupsAttribute user={user} />

            <UserButton operation="U" user={user} className="btn btn-primary">Upravit</UserButton>
            <StateMachnineManagement user={user} />
            <UserData user={user} />
            <UserData user={user} />
            
            <pre>{JSON.stringify(user, null, 2)}</pre> 
        </UserLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an user entity.
 *
 * This component is created using `createLazyComponent` and wraps `UserPageContent` to provide
 * automatic data fetching for the `user` entity. It uses the `UserReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `user` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.user - The identifier of the user entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `user` entity data and displays it
 * using `UserPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const userId = "12345";
 *
 * <UserPageContentLazy user={userId} />
 */
const UserPageContentLazy = ({user}) => {
    const { error, loading, entity, fetch } = useAsyncAction(UserReadAsyncAction, user)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <UserPageContent user={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an user entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `user` object, and passes it to the `UserPageContentLazy` component.
 * The `UserPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the user entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/user/:id" element={<UserPage />} />
 *
 * // Navigating to "/user/12345" will render the page for the user entity with ID 12345.
 */
export const UserPage = () => {
    const {id} = useParams()
    const user = {id}
    return <UserPageContentLazy user={user} />
}