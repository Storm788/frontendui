/**
 * A component for displaying the `changedby` attribute of an programtype entity.
 *
 * This component checks if the `changedby` attribute exists on the `programtype` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeChangedbyAttribute component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {*} [props.programtype.changedby] - The changedby attribute of the programtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <ProgramTypeChangedbyAttribute programtype={programtypeEntity} />
 */
export const ProgramTypeChangedbyAttribute = ({programtype}) => {
    const {changedby} = programtype
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