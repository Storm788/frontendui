import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { SubjectLargeCard } from "../Components"
import { SubjectReadAsyncAction } from "../Queries"
import { SubjectPageNavbar } from "./SubjectPageNavbar"

/**
 * A page content component for displaying detailed information about an subject entity.
 *
 * This component utilizes `SubjectLargeCard` to create a structured layout and displays 
 * the serialized representation of the `subject` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the SubjectPageContent component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an subject entity.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SubjectPageContent subject={subjectEntity} />
 */
const SubjectPageContent = ({subject}) => {
    return (<>
        <SubjectPageNavbar subject={subject} />
        <SubjectLargeCard subject={subject}>
            Subject {JSON.stringify(subject)}
        </SubjectLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an subject entity.
 *
 * This component is created using `createLazyComponent` and wraps `SubjectPageContent` to provide
 * automatic data fetching for the `subject` entity. It uses the `SubjectReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `subject` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.subject - The identifier of the subject entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `subject` entity data and displays it
 * using `SubjectPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const subjectId = "12345";
 *
 * <SubjectPageContentLazy subject={subjectId} />
 */
const SubjectPageContentLazy = ({subject}) => {
    const { error, loading, entity, fetch } = useAsyncAction(SubjectReadAsyncAction, subject)
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
        {entity && <SubjectPageContent subject={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an subject entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `subject` object, and passes it to the `SubjectPageContentLazy` component.
 * The `SubjectPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the subject entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/subject/:id" element={<SubjectPage />} />
 *
 * // Navigating to "/subject/12345" will render the page for the subject entity with ID 12345.
 */
export const SubjectPage = () => {
    const {id} = useParams()
    const subject = {id}
    return <SubjectPageContentLazy subject={subject} />
}