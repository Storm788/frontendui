import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { GroupLargeCard } from "../Components"
import { GroupReadAsyncAction } from "../Queries"
import { GroupPageNavbar } from "./GroupPageNavbar"
import { GroupUsersAttribute } from "../Vectors/GroupUsersAttribute"

/**
 * A page content component for displaying detailed information about an group entity.
 *
 * This component utilizes `GroupLargeCard` to create a structured layout and displays 
 * the serialized representation of the `group` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the GroupPageContent component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The name or label of the group entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an group entity.
 *
 * @example
 * // Example usage:
 * const groupEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GroupPageContent group={groupEntity} />
 */
const GroupPageContent = ({group}) => {
    return (<>
        <GroupPageNavbar group={group} />
        <GroupLargeCard group={group}>
            <GroupUsersAttribute group={group} />
        </GroupLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an group entity.
 *
 * This component is created using `createLazyComponent` and wraps `GroupPageContent` to provide
 * automatic data fetching for the `group` entity. It uses the `GroupReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `group` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.group - The identifier of the group entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `group` entity data and displays it
 * using `GroupPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const groupId = "12345";
 *
 * <GroupPageContentLazy group={groupId} />
 */
const GroupPageContentLazy = ({group}) => {
    const { error, loading, entity, fetch } = useAsyncAction(GroupReadAsyncAction, group)
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
        {entity && <GroupPageContent group={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an group entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `group` object, and passes it to the `GroupPageContentLazy` component.
 * The `GroupPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the group entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/group/:id" element={<GroupPage />} />
 *
 * // Navigating to "/group/12345" will render the page for the group entity with ID 12345.
 */
export const GroupPage = () => {
    const {id} = useParams()
    const group = {id}
    return <GroupPageContentLazy group={group} />
}