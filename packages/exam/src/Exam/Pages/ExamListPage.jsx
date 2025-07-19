import { useState } from "react"
import { useParams } from "react-router"
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ExamButton, ExamLargeCard } from "../Components"
import { ExamReadAsyncAction } from "../Queries"
import { ExamPageNavbar } from "./ExamPageNavbar"
import { ExamList } from "../Components/ExamData"
import { ExamReadPageAsyncAction } from "../Queries/ExamReadPageAsyncAction"
import { Card, Row, Col, Form, InputGroup, Container, Button } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
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

const ExamListPageContent = ({ exams, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault() // Prevent form submission
        onSearch(searchTerm)
    }

    return (
        
        <Container fluid>
            <Row className="mb-4">
                <Col>
                <ExamPageNavbar exams={exams} />
                    <Card>
                        <Card.Header>
                            <h4 className="mb-0">Seznam zkoušek</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Form onSubmit={handleSearchSubmit}>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <Search />
                                            </InputGroup.Text>
                                            <Form.Control
                                                placeholder="Hledat zkoušky..."
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <Button type="submit" variant="outline-primary">
                                                Hledat
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                </Col>
                                <Col md={4} className="text-end">
                                    <ExamButton exam={{}} operation="C" className="btn btn-primary">
                                        Přidat novou zkoušku
                                    </ExamButton>
                                </Col>
                            </Row>
                            <ExamList exams={exams} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
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
const ExamListPageContentLazy = () => {
    const { error, loading, dispatchResult, fetch } = useAsyncAction(ExamReadPageAsyncAction, {})

    const handleSearch = async (searchTerm) => {
        if (!searchTerm) {
            await fetch({})
            return
        }

        await fetch({ 
            where: {
                name: { _ilike: `%${searchTerm}%` }
            }
        })
    }

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {dispatchResult && (
                <ExamListPageContent 
                    exams={dispatchResult.data.result} 
                    onSearch={handleSearch}
                />
            )}
        </>
    )
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
export const ExamListPage = () => {
    return <ExamListPageContentLazy />
}