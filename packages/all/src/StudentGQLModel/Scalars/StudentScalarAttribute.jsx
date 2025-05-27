import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an student entity.
 *
 * This component checks if the `scalar` attribute exists on the `student` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudentScalarAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {*} [props.student.scalar] - The scalar attribute of the student entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <StudentScalarAttribute student={studentEntity} />
 */
export const StudentScalarAttribute = ({student}) => {
    const {scalar} = student
    if (typeof scalar === 'undefined') return null
    return (
        <>
            {/* <ScalarMediumCard scalar={scalar} /> */}
            {/* <ScalarLink scalar={scalar} /> */}
            Probably {'<ScalarMediumCard scalar={scalar} />'} <br />
            <pre>{JSON.stringify(scalar, null, 4)}</pre>
        </>
    )
}

const StudentScalarAttributeQuery = `
query StudentQueryRead($id: UUID!) {
    result: studentById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const StudentScalarAttributeAsyncAction = createAsyncGraphQLAction(
    StudentScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `student` entity.
 *
 * This component uses the `StudentScalarAttributeAsyncAction` to asynchronously fetch
 * the `student.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.student - The student entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <StudentScalarAttributeLazy student={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudentScalarAttributeLazy
 *   student={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudentScalarAttributeLazy = ({student}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudentScalarAttributeAsyncAction, student)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudentScalarAttribute student={entity} />    
}