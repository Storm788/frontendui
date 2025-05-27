import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an studyplan entity.
 *
 * This component checks if the `scalar` attribute exists on the `studyplan` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanScalarAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.scalar] - The scalar attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <StudyPlanScalarAttribute studyplan={studyplanEntity} />
 */
export const StudyPlanScalarAttribute = ({studyplan}) => {
    const {scalar} = studyplan
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

const StudyPlanScalarAttributeQuery = `
query StudyPlanQueryRead($id: UUID!) {
    result: studyplanById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const StudyPlanScalarAttributeAsyncAction = createAsyncGraphQLAction(
    StudyPlanScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `studyplan` entity.
 *
 * This component uses the `StudyPlanScalarAttributeAsyncAction` to asynchronously fetch
 * the `studyplan.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.studyplan - The studyplan entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <StudyPlanScalarAttributeLazy studyplan={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudyPlanScalarAttributeLazy
 *   studyplan={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudyPlanScalarAttributeLazy = ({studyplan}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudyPlanScalarAttributeAsyncAction, studyplan)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudyPlanScalarAttribute studyplan={entity} />    
}