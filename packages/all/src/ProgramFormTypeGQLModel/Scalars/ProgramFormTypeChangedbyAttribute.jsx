/**
 * A component for displaying the `changedby` attribute of an programformtype entity.
 *
 * This component checks if the `changedby` attribute exists on the `programformtype` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramFormTypeChangedbyAttribute component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {*} [props.programformtype.changedby] - The changedby attribute of the programformtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <ProgramFormTypeChangedbyAttribute programformtype={programformtypeEntity} />
 */
export const ProgramFormTypeChangedbyAttribute = ({programformtype}) => {
    const {changedby} = programformtype
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