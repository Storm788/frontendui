import { useState } from "react"
import { useParams } from "react-router"
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudentLargeCard } from "../Components"
import { StudentReadAsyncAction } from "../Queries"
import { StudentPageNavbar } from "./StudentPageNavbar"
import { StudentButton } from "../Components/StudentCUDButton"

/**
 * A page content component for displaying detailed information about an student entity.
 *
 * This component utilizes `StudentLargeCard` to create a structured layout and displays 
 * the serialized representation of the `student` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the StudentPageContent component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name or label of the student entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an student entity.
 *
 * @example
 * // Example usage:
 * const studentEntity = { id: 123, name: "Sample Entity" };
 *
 * <StudentPageContent student={studentEntity} />
 */
const StudentPageContent = ({student}) => {
    return (<>
        <StudentPageNavbar student={student} />
        <StudentLargeCard student={student}>
            Student {JSON.stringify(student)}
            <StudentButton student={{}} operation="C" className="btn btn-warning" onDone={(data)=>console.log(data)}>Insert</StudentButton> <br />
            <StudentButton student={student} operation="U" className="btn btn-success">Update</StudentButton><br />
            <StudentButton student={student} operation="D" className="btn btn-danger">Delete</StudentButton><br />
                    
        </StudentLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an student entity.
 *
 * This component is created using `createLazyComponent` and wraps `StudentPageContent` to provide
 * automatic data fetching for the `student` entity. It uses the `StudentReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `student` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.student - The identifier of the student entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `student` entity data and displays it
 * using `StudentPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const studentId = "12345";
 *
 * <StudentPageContentLazy student={studentId} />
 */
const StudentPageContentLazy = ({student}) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudentReadAsyncAction, student)
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
        {entity && <StudentPageContent student={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an student entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `student` object, and passes it to the `StudentPageContentLazy` component.
 * The `StudentPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the student entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/student/:id" element={<StudentPage />} />
 *
 * // Navigating to "/student/12345" will render the page for the student entity with ID 12345.
 */
export const StudentPage = () => {
    const {id} = useParams()
    const student = {id}
    return <StudentPageContentLazy student={student} />
}