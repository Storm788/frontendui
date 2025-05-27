/**
 * A component for displaying the `createdby` attribute of an statemachine entity.
 *
 * This component checks if the `createdby` attribute exists on the `statemachine` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateMachineCreatedbyAttribute component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {*} [props.statemachine.createdby] - The createdby attribute of the statemachine entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <StateMachineCreatedbyAttribute statemachine={statemachineEntity} />
 */
export const StateMachineCreatedbyAttribute = ({statemachine}) => {
    const {createdby} = statemachine
    if (typeof createdby === 'undefined') return null
    return (
        <>
            {/* <CreatedbyMediumCard createdby={createdby} /> */}
            {/* <CreatedbyLink createdby={createdby} /> */}
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}