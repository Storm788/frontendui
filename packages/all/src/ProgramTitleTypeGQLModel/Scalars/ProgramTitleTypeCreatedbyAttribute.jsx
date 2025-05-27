/**
 * A component for displaying the `createdby` attribute of an programtitletype entity.
 *
 * This component checks if the `createdby` attribute exists on the `programtitletype` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTitleTypeCreatedbyAttribute component.
 * @param {Object} props.programtitletype - The object representing the programtitletype entity.
 * @param {*} [props.programtitletype.createdby] - The createdby attribute of the programtitletype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtitletypeEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <ProgramTitleTypeCreatedbyAttribute programtitletype={programtitletypeEntity} />
 */
export const ProgramTitleTypeCreatedbyAttribute = ({programtitletype}) => {
    const {createdby} = programtitletype
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