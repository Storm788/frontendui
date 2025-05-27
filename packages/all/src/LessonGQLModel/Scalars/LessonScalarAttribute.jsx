import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an lesson entity.
 *
 * This component checks if the `scalar` attribute exists on the `lesson` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonScalarAttribute component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {*} [props.lesson.scalar] - The scalar attribute of the lesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <LessonScalarAttribute lesson={lessonEntity} />
 */
export const LessonScalarAttribute = ({lesson}) => {
    const {scalar} = lesson
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

const LessonScalarAttributeQuery = `
query LessonQueryRead($id: UUID!) {
    result: lessonById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const LessonScalarAttributeAsyncAction = createAsyncGraphQLAction(
    LessonScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `lesson` entity.
 *
 * This component uses the `LessonScalarAttributeAsyncAction` to asynchronously fetch
 * the `lesson.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.lesson - The lesson entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <LessonScalarAttributeLazy lesson={{ id: "abc123" }} />
 *
 * 
 * @example
 * <LessonScalarAttributeLazy
 *   lesson={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const LessonScalarAttributeLazy = ({lesson}) => {
    const {loading, error, entity, fetch} = useAsyncAction(LessonScalarAttributeAsyncAction, lesson)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <LessonScalarAttribute lesson={entity} />    
}