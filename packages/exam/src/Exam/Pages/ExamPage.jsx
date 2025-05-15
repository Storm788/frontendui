import { useState } from "react"
import { useParams } from "react-router"
import { ExamData } from "../Components/ExamData"
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ExamLargeCard } from "../Components"
import { ExamReadAsyncAction } from "../Queries"
import { ExamPageNavbar } from "./ExamPageNavbar"

/**
 * A page content component for displaying detailed information about an exam entity.
 *
 * This component utilizes `ExamLargeCard` to create a structured layout and displays 
 * the serialized representation of the `exam` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the ExamPageContent component.
 * @param {Object} props.exam - The object representing the exam entity.
 * @param {string|number} props.exam.id - The unique identifier for the exam entity.
 * @param {string} props.exam.name - The name or label of the exam entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an exam entity.
 *
 * @example
 * // Example usage:
 * const examEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ExamPageContent exam={examEntity} />
 */


export const placeholder_data = {
    
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Flasarova hodina brainrotu",
    "maxScore": 100,
    "minScore": 69,   
}

const ExamPageContent = ({placeholder_data}) => {
    return (<>
        <ExamPageNavbar exam={placeholder_data} />
        <ExamLargeCard exam={placeholder_data}>
            Exam {JSON.stringify(placeholder_data)}
            <ExamData exam={placeholder_data} />
        </ExamLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an exam entity.
 *
 * This component is created using `createLazyComponent` and wraps `ExamPageContent` to provide
 * automatic data fetching for the `exam` entity. It uses the `ExamReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `exam` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.exam - The identifier of the exam entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `exam` entity data and displays it
 * using `ExamPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const examId = "12345";
 *
 * <ExamPageContentLazy exam={examId} />
 */
const ExamPageContentLazy = ({exam}) => {
    const { error, loading, entity, fetch } = useAsyncAction(ExamReadAsyncAction, exam)
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
        {entity && <ExamPageContent exam={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an exam entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `exam` object, and passes it to the `ExamPageContentLazy` component.
 * The `ExamPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the exam entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/exam/:id" element={<ExamPage />} />
 *
 * // Navigating to "/exam/12345" will render the page for the exam entity with ID 12345.
 */
export const ExamPage = () => {
    const {id} = useParams()
    const exam = {id}
    
    //return <ExamPageContentLazy exam={exam} />
    return <ExamPageContent exam={placeholder_data} />
}