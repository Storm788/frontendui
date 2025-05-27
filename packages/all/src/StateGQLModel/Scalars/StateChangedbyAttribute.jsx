/**
 * A component for displaying the `changedby` attribute of an state entity.
 *
 * This component checks if the `changedby` attribute exists on the `state` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateChangedbyAttribute component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {*} [props.state.changedby] - The changedby attribute of the state entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const stateEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <StateChangedbyAttribute state={stateEntity} />
 */
export const StateChangedbyAttribute = ({state}) => {
    const {changedby} = state
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