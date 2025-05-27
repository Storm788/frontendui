import { useState } from "react"
import { useParams } from "react-router"
import { EvaluationButton, EvaluationLargeCard } from "../Components"
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { EvaluationReadAsyncAction } from "../Queries"
import { EvaluationPageNavbar } from "./EvaluationPageNavbar"

/**
 * A page content component for displaying detailed information about an evaluation entity.
 *
 * This component utilizes `EvaluationLargeCard` to create a structured layout and displays 
 * the serialized representation of the `evaluation` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the EvaluationPageContent component.
 * @param {Object} props.evaluation - The object representing the evaluation entity.
 * @param {string|number} props.evaluation.id - The unique identifier for the evaluation entity.
 * @param {string} props.evaluation.name - The name or label of the evaluation entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an evaluation entity.
 *
 * @example
 * // Example usage:
 * const evaluationEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EvaluationPageContent evaluation={evaluationEntity} />
 */

const EvaluationPageContent = ({ evaluation }) => {
    return (<>
        <EvaluationPageNavbar evaluation={evaluation} />
        <EvaluationLargeCard evaluation={evaluation}>
            Exam {JSON.stringify(evaluation)} <br />
            <EvaluationButton evaluation={{}} operation="C" className="btn btn-warning" onDone={(data)=>console.log(data)}>Insert</EvaluationButton> <br />
        </EvaluationLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an evaluation entity.
 *
 * This component is created using `createLazyComponent` and wraps `EvaluationPageContent` to provide
 * automatic data fetching for the `evaluation` entity. It uses the `EvaluationReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `evaluation` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.evaluation - The identifier of the evaluation entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `evaluation` entity data and displays it
 * using `EvaluationPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const evaluationId = "12345";
 *
 * <EvaluationPageContentLazy evaluation={evaluationId} />
 */
const EvaluationPageContentLazy = ({evaluation}) => {
    const { error, loading, entity, fetch } = useAsyncAction(EvaluationReadAsyncAction, evaluation)
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
        {entity && <EvaluationPageContent evaluation={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an evaluation entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `evaluation` object, and passes it to the `EvaluationPageContentLazy` component.
 * The `EvaluationPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the evaluation entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/evaluation/:id" element={<EvaluationPage />} />
 *
 * // Navigating to "/evaluation/12345" will render the page for the evaluation entity with ID 12345.
 */
export const EvaluationPage = () => {
    const {id} = useParams()
    const evaluation = {id}

    return <EvaluationPageContentLazy evaluation={evaluation} />
}