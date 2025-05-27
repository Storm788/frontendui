import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `scalar` attribute of an statemachine entity.
 *
 * This component checks if the `scalar` attribute exists on the `statemachine` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateMachineScalarAttribute component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {*} [props.statemachine.scalar] - The scalar attribute of the statemachine entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <StateMachineScalarAttribute statemachine={statemachineEntity} />
 */
export const StateMachineScalarAttribute = ({statemachine}) => {
    const {scalar} = statemachine
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

const StateMachineScalarAttributeQuery = `
query StateMachineQueryRead($id: UUID!) {
    result: statemachineById(id: $id) {
        __typename
        id
        scalar {
            __typename
            id
        }
    }
}
`

const StateMachineScalarAttributeAsyncAction = createAsyncGraphQLAction(
    StateMachineScalarAttributeQuery
)

/**
 * A lazy-loading component for displaying filtered `scalar` from a `statemachine` entity.
 *
 * This component uses the `StateMachineScalarAttributeAsyncAction` to asynchronously fetch
 * the `statemachine.scalar` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each vector item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.statemachine - The statemachine entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `scalar` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered scalar or a loading/error placeholder.
 *
 * @example
 * <StateMachineScalarAttributeLazy statemachine={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StateMachineScalarAttributeLazy
 *   statemachine={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StateMachineScalarAttributeLazy = ({statemachine}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StateMachineScalarAttributeAsyncAction, statemachine)

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StateMachineScalarAttribute statemachine={entity} />    
}