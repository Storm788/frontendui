/**
 * A component for displaying the `createdby` attribute of an programformtype entity.
 *
 * This component checks if the `createdby` attribute exists on the `programformtype` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramFormTypeCreatedbyAttribute component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {*} [props.programformtype.createdby] - The createdby attribute of the programformtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <ProgramFormTypeCreatedbyAttribute programformtype={programformtypeEntity} />
 */
export const ProgramFormTypeCreatedbyAttribute = ({programformtype}) => {
    const {createdby} = programformtype
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