/**
 * A component for displaying the `statemachine` attribute of an statetransition entity.
 *
 * This component checks if the `statemachine` attribute exists on the `statetransition` object. If `statemachine` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `statemachine` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionStatemachineAttribute component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {*} [props.statetransition.statemachine] - The statemachine attribute of the statetransition entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `statemachine` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { statemachine: { id: 1, name: "Sample Statemachine" } };
 *
 * <StateTransitionStatemachineAttribute statetransition={statetransitionEntity} />
 */
export const StateTransitionStatemachineAttribute = ({statetransition}) => {
    const {statemachine} = statetransition
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