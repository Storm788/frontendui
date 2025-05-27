/**
 * A component for displaying the `createdby` attribute of an programtype entity.
 *
 * This component checks if the `createdby` attribute exists on the `programtype` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeCreatedbyAttribute component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {*} [props.programtype.createdby] - The createdby attribute of the programtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <ProgramTypeCreatedbyAttribute programtype={programtypeEntity} />
 */
export const ProgramTypeCreatedbyAttribute = ({programtype}) => {
    const {createdby} = programtype
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