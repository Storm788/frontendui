import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an statetransition entity.
 *
 * This component checks if the `scalar` attribute exists on the `statetransition` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionScalarAttribute component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {*} [props.statetransition.scalar] - The scalar attribute of the statetransition entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <StateTransitionScalarAttribute statetransition={statetransitionEntity} />
 */
export const StateTransitionScalarAttribute = ({statetransition}) => {
    const {scalar} = statetransition
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

const StateTransitionScalarAttributeQuery = `
query StateTransitionQueryRead($id: UUID!) {
    result: statetransitionById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const StateTransitionScalarAttributeAsyncAction = createAsyncGraphQLAction(
    StateTransitionScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `statetransition` entity.
 *
 * This component uses the `StateTransitionScalarAttributeAsyncAction` to asynchronously fetch
 * the `statetransition.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.statetransition - The statetransition entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <StateTransitionScalarAttributeLazy statetransition={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StateTransitionScalarAttributeLazy
 *   statetransition={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StateTransitionScalarAttributeLazy = ({statetransition}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StateTransitionScalarAttributeAsyncAction, statetransition)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StateTransitionScalarAttribute statetransition={entity} />    
}