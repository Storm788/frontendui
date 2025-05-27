/**
 * A component for displaying the `changedby` attribute of an semester entity.
 *
 * This component checks if the `changedby` attribute exists on the `semester` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the SemesterChangedbyAttribute component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {*} [props.semester.changedby] - The changedby attribute of the semester entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <SemesterChangedbyAttribute semester={semesterEntity} />
 */
export const SemesterChangedbyAttribute = ({semester}) => {
    const {changedby} = semester
    if (typeof changedby === 'undefined') return null
    return (
        <>
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}