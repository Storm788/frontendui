/**
 * A component for displaying the `changedby` attribute of an programleveltype entity.
 *
 * This component checks if the `changedby` attribute exists on the `programleveltype` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLevelTypeChangedbyAttribute component.
 * @param {Object} props.programleveltype - The object representing the programleveltype entity.
 * @param {*} [props.programleveltype.changedby] - The changedby attribute of the programleveltype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programleveltypeEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <ProgramLevelTypeChangedbyAttribute programleveltype={programleveltypeEntity} />
 */
export const ProgramLevelTypeChangedbyAttribute = ({programleveltype}) => {
    const {changedby} = programleveltype
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