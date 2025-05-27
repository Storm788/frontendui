/**
 * A component for displaying the `changedby` attribute of an programlanguagetype entity.
 *
 * This component checks if the `changedby` attribute exists on the `programlanguagetype` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLanguageTypeChangedbyAttribute component.
 * @param {Object} props.programlanguagetype - The object representing the programlanguagetype entity.
 * @param {*} [props.programlanguagetype.changedby] - The changedby attribute of the programlanguagetype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programlanguagetypeEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <ProgramLanguageTypeChangedbyAttribute programlanguagetype={programlanguagetypeEntity} />
 */
export const ProgramLanguageTypeChangedbyAttribute = ({programlanguagetype}) => {
    const {changedby} = programlanguagetype
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