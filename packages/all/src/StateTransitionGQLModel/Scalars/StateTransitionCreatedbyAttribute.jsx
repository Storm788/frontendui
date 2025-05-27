/**
 * A component for displaying the `createdby` attribute of an statetransition entity.
 *
 * This component checks if the `createdby` attribute exists on the `statetransition` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionCreatedbyAttribute component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {*} [props.statetransition.createdby] - The createdby attribute of the statetransition entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <StateTransitionCreatedbyAttribute statetransition={statetransitionEntity} />
 */
export const StateTransitionCreatedbyAttribute = ({statetransition}) => {
    const {createdby} = statetransition
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