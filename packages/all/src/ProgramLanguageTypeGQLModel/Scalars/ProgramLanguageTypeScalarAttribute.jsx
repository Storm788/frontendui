import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an programlanguagetype entity.
 *
 * This component checks if the `scalar` attribute exists on the `programlanguagetype` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLanguageTypeScalarAttribute component.
 * @param {Object} props.programlanguagetype - The object representing the programlanguagetype entity.
 * @param {*} [props.programlanguagetype.scalar] - The scalar attribute of the programlanguagetype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programlanguagetypeEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <ProgramLanguageTypeScalarAttribute programlanguagetype={programlanguagetypeEntity} />
 */
export const ProgramLanguageTypeScalarAttribute = ({programlanguagetype}) => {
    const {scalar} = programlanguagetype
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

const ProgramLanguageTypeScalarAttributeQuery = `
query ProgramLanguageTypeQueryRead($id: UUID!) {
    result: programlanguagetypeById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const ProgramLanguageTypeScalarAttributeAsyncAction = createAsyncGraphQLAction(
    ProgramLanguageTypeScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `programlanguagetype` entity.
 *
 * This component uses the `ProgramLanguageTypeScalarAttributeAsyncAction` to asynchronously fetch
 * the `programlanguagetype.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.programlanguagetype - The programlanguagetype entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <ProgramLanguageTypeScalarAttributeLazy programlanguagetype={{ id: "abc123" }} />
 *
 * 
 * @example
 * <ProgramLanguageTypeScalarAttributeLazy
 *   programlanguagetype={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const ProgramLanguageTypeScalarAttributeLazy = ({programlanguagetype}) => {
    const {loading, error, entity, fetch} = useAsyncAction(ProgramLanguageTypeScalarAttributeAsyncAction, programlanguagetype)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <ProgramLanguageTypeScalarAttribute programlanguagetype={entity} />    
}