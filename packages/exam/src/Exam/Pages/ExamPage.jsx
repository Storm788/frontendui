import { useState } from "react"
import { data, useParams } from "react-router"
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ExamButton, ExamLargeCard } from "../Components"
import { ExamReadAsyncAction } from "../Queries"
import { ExamPageNavbar } from "./ExamPageNavbar"
import { StudentList } from "../../Student/Components/StudentData"
import { EvaluationReadPageAsyncAction } from "../../Evaluation/Queries/EvaluationReadPageAsyncAction"
import { Card, Row, Col, Badge } from "react-bootstrap"

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


const ExamPageContent = ({ exam, students, onStudentAdded, readOnly }) => {
    return (<>
        <ExamPageNavbar exam={exam} />
        <ExamLargeCard exam={exam}>
            <Row>
                <Col>
                    {/* Obalující karta pro seznam studentů */}
                    <Card>
                        {/* Tělo karty bez vnitřního odsazení pro lepší vzhled seznamu */}
                        <Card.Body className="p-0">
                            <StudentList students={students} onStudentAdded={onStudentAdded} exam={exam} readOnly={readOnly} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
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
const ExamPageContentLazy = ({ exam, readOnly }) => {
    const { error, loading, entity, fetch } = useAsyncAction(ExamReadAsyncAction, exam)
    const { error: evalsError, loading: evalsLoading, dispatchResult: evalsDispatchResult, fetch: evalFetch }
        = useAsyncAction(EvaluationReadPageAsyncAction, { where: { exam_id: { _eq: exam.id } }, limit: 100 })
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async (e) => {
        const data = e.target.value
        await delayer(() => fetch(data))
    }
    const handleBlur = async (e) => {
        const data = e.target.value
        await delayer(() => fetch(data))
    }
    // Callback to refresh exam data after student is added
    const handleStudentAdded = () => {
        fetch(exam)
        evalFetch({ where: { exam_id: { _eq: exam.id } }, limit: 100 })
    }

    const students = evalsDispatchResult?.data?.result || [];

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <ExamPageContent exam={entity} students={students} onStudentAdded={handleStudentAdded} readOnly={readOnly} />}
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
export const ExamPage = ({readOnly}) => {
    const { id } = useParams()
    const exam = { id }

    return <ExamPageContentLazy exam={exam} readOnly={readOnly} />
}