import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an programleveltype entity.
 *
 * This component checks if the `scalar` attribute exists on the `programleveltype` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLevelTypeScalarAttribute component.
 * @param {Object} props.programleveltype - The object representing the programleveltype entity.
 * @param {*} [props.programleveltype.scalar] - The scalar attribute of the programleveltype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programleveltypeEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <ProgramLevelTypeScalarAttribute programleveltype={programleveltypeEntity} />
 */
export const ProgramLevelTypeScalarAttribute = ({programleveltype}) => {
    const {scalar} = programleveltype
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

const ProgramLevelTypeScalarAttributeQuery = `
query ProgramLevelTypeQueryRead($id: UUID!) {
    result: programleveltypeById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const ProgramLevelTypeScalarAttributeAsyncAction = createAsyncGraphQLAction(
    ProgramLevelTypeScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `programleveltype` entity.
 *
 * This component uses the `ProgramLevelTypeScalarAttributeAsyncAction` to asynchronously fetch
 * the `programleveltype.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.programleveltype - The programleveltype entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <ProgramLevelTypeScalarAttributeLazy programleveltype={{ id: "abc123" }} />
 *
 * 
 * @example
 * <ProgramLevelTypeScalarAttributeLazy
 *   programleveltype={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const ProgramLevelTypeScalarAttributeLazy = ({programleveltype}) => {
    const {loading, error, entity, fetch} = useAsyncAction(ProgramLevelTypeScalarAttributeAsyncAction, programleveltype)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <ProgramLevelTypeScalarAttribute programleveltype={entity} />    
}