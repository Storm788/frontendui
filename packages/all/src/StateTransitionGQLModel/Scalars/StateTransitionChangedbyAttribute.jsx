/**
 * A component for displaying the `changedby` attribute of an statetransition entity.
 *
 * This component checks if the `changedby` attribute exists on the `statetransition` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionChangedbyAttribute component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {*} [props.statetransition.changedby] - The changedby attribute of the statetransition entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <StateTransitionChangedbyAttribute statetransition={statetransitionEntity} />
 */
export const StateTransitionChangedbyAttribute = ({statetransition}) => {
    const {changedby} = statetransition
    if (typeof changedby === 'undefined') return null
    return (
        <>
            {/* <ChangedbyMediumCard changedby={changedby} /> */}
            {/* <ChangedbyLink changedby={changedby} /> */}
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}