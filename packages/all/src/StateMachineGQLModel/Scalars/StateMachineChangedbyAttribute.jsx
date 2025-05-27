/**
 * A component for displaying the `changedby` attribute of an statemachine entity.
 *
 * This component checks if the `changedby` attribute exists on the `statemachine` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateMachineChangedbyAttribute component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {*} [props.statemachine.changedby] - The changedby attribute of the statemachine entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <StateMachineChangedbyAttribute statemachine={statemachineEntity} />
 */
export const StateMachineChangedbyAttribute = ({statemachine}) => {
    const {changedby} = statemachine
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