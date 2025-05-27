/**
 * A component for displaying the `createdby` attribute of an programleveltype entity.
 *
 * This component checks if the `createdby` attribute exists on the `programleveltype` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLevelTypeCreatedbyAttribute component.
 * @param {Object} props.programleveltype - The object representing the programleveltype entity.
 * @param {*} [props.programleveltype.createdby] - The createdby attribute of the programleveltype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programleveltypeEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <ProgramLevelTypeCreatedbyAttribute programleveltype={programleveltypeEntity} />
 */
export const ProgramLevelTypeCreatedbyAttribute = ({programleveltype}) => {
    const {createdby} = programleveltype
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