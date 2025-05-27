/**
 * A component for displaying the `changedby` attribute of an program entity.
 *
 * This component checks if the `changedby` attribute exists on the `program` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramChangedbyAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {*} [props.program.changedby] - The changedby attribute of the program entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <ProgramChangedbyAttribute program={programEntity} />
 */
export const ProgramChangedbyAttribute = ({program}) => {
    const {changedby} = program
    if (typeof changedby === 'undefined') return null
    return (
        <>
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}