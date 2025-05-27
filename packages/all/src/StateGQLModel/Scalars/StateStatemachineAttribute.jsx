/**
 * A component for displaying the `statemachine` attribute of an state entity.
 *
 * This component checks if the `statemachine` attribute exists on the `state` object. If `statemachine` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `statemachine` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateStatemachineAttribute component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {*} [props.state.statemachine] - The statemachine attribute of the state entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `statemachine` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const stateEntity = { statemachine: { id: 1, name: "Sample Statemachine" } };
 *
 * <StateStatemachineAttribute state={stateEntity} />
 */
export const StateStatemachineAttribute = ({state}) => {
    const {statemachine} = state
    if (typeof statemachine === 'undefined') return null
    return (
        <>
            {/* <StatemachineMediumCard statemachine={statemachine} /> */}
            {/* <StatemachineLink statemachine={statemachine} /> */}
            Probably {'<StatemachineMediumCard statemachine=\{statemachine\} />'} <br />
            <pre>{JSON.stringify(statemachine, null, 4)}</pre>
        </>
    )
}