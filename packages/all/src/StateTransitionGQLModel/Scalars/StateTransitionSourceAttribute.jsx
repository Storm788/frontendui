/**
 * A component for displaying the `source` attribute of an statetransition entity.
 *
 * This component checks if the `source` attribute exists on the `statetransition` object. If `source` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `source` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionSourceAttribute component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {*} [props.statetransition.source] - The source attribute of the statetransition entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `source` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { source: { id: 1, name: "Sample Source" } };
 *
 * <StateTransitionSourceAttribute statetransition={statetransitionEntity} />
 */
export const StateTransitionSourceAttribute = ({statetransition}) => {
    const {source} = statetransition
    if (typeof source === 'undefined') return null
    return (
        <>
            {/* <SourceMediumCard source={source} /> */}
            {/* <SourceLink source={source} /> */}
            Probably {'<SourceMediumCard source=\{source\} />'} <br />
            <pre>{JSON.stringify(source, null, 4)}</pre>
        </>
    )
}