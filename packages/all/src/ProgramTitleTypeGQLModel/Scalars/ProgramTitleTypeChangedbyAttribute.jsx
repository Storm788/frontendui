/**
 * A component for displaying the `changedby` attribute of an programtitletype entity.
 *
 * This component checks if the `changedby` attribute exists on the `programtitletype` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTitleTypeChangedbyAttribute component.
 * @param {Object} props.programtitletype - The object representing the programtitletype entity.
 * @param {*} [props.programtitletype.changedby] - The changedby attribute of the programtitletype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtitletypeEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <ProgramTitleTypeChangedbyAttribute programtitletype={programtitletypeEntity} />
 */
export const ProgramTitleTypeChangedbyAttribute = ({programtitletype}) => {
    const {changedby} = programtitletype
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