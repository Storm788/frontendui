import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an programformtype entity.
 *
 * This component checks if the `scalar` attribute exists on the `programformtype` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramFormTypeScalarAttribute component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {*} [props.programformtype.scalar] - The scalar attribute of the programformtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <ProgramFormTypeScalarAttribute programformtype={programformtypeEntity} />
 */
export const ProgramFormTypeScalarAttribute = ({programformtype}) => {
    const {scalar} = programformtype
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

const ProgramFormTypeScalarAttributeQuery = `
query ProgramFormTypeQueryRead($id: UUID!) {
    result: programformtypeById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const ProgramFormTypeScalarAttributeAsyncAction = createAsyncGraphQLAction(
    ProgramFormTypeScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `programformtype` entity.
 *
 * This component uses the `ProgramFormTypeScalarAttributeAsyncAction` to asynchronously fetch
 * the `programformtype.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.programformtype - The programformtype entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <ProgramFormTypeScalarAttributeLazy programformtype={{ id: "abc123" }} />
 *
 * 
 * @example
 * <ProgramFormTypeScalarAttributeLazy
 *   programformtype={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const ProgramFormTypeScalarAttributeLazy = ({programformtype}) => {
    const {loading, error, entity, fetch} = useAsyncAction(ProgramFormTypeScalarAttributeAsyncAction, programformtype)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <ProgramFormTypeScalarAttribute programformtype={entity} />    
}