import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramLargeCard } from "../Components"
import { ProgramReadAsyncAction } from "../Queries"
import { ProgramPageNavbar } from "./ProgramPageNavbar"
import { ProgramSubjectsAttribute } from "../Vectors/ProgramSubjectsAttribute"

/**
 * A page content component for displaying detailed information about an program entity.
 *
 * This component utilizes `ProgramLargeCard` to create a structured layout and displays 
 * the serialized representation of the `program` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the ProgramPageContent component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {string|number} props.program.id - The unique identifier for the program entity.
 * @param {string} props.program.name - The name or label of the program entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an program entity.
 *
 * @example
 * // Example usage:
 * const programEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramPageContent program={programEntity} />
 */
const ProgramPageContent = ({program}) => {
    return (<>
        <ProgramPageNavbar program={program} />
        <ProgramLargeCard program={program}>
            <ProgramSubjectsAttribute program={program} />
            Program JSON <pre>{JSON.stringify(program, null, 2)}</pre> <br />
        </ProgramLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an program entity.
 *
 * This component is created using `createLazyComponent` and wraps `ProgramPageContent` to provide
 * automatic data fetching for the `program` entity. It uses the `ProgramReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `program` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.program - The identifier of the program entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `program` entity data and displays it
 * using `ProgramPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const programId = "12345";
 *
 * <ProgramPageContentLazy program={programId} />
 */
const ProgramPageContentLazy = ({program}) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramReadAsyncAction, program)
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
        {entity && <ProgramPageContent program={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an program entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `program` object, and passes it to the `ProgramPageContentLazy` component.
 * The `ProgramPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the program entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/program/:id" element={<ProgramPage />} />
 *
 * // Navigating to "/program/12345" will render the page for the program entity with ID 12345.
 */
export const ProgramPage = () => {
    const {id} = useParams()
    const program = {id}

    // return <div>Hello World {id}</div>

    return <ProgramPageContentLazy program={program} />
}