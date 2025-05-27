/**
 * A component for displaying the `createdby` attribute of an state entity.
 *
 * This component checks if the `createdby` attribute exists on the `state` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateCreatedbyAttribute component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {*} [props.state.createdby] - The createdby attribute of the state entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const stateEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <StateCreatedbyAttribute state={stateEntity} />
 */
export const StateCreatedbyAttribute = ({state}) => {
    const {createdby} = state
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