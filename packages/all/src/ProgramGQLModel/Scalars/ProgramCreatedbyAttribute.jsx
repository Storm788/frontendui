/**
 * A component for displaying the `createdby` attribute of an program entity.
 *
 * This component checks if the `createdby` attribute exists on the `program` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramCreatedbyAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {*} [props.program.createdby] - The createdby attribute of the program entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <ProgramCreatedbyAttribute program={programEntity} />
 */
export const ProgramCreatedbyAttribute = ({program}) => {
    const {createdby} = program
    if (typeof createdby === 'undefined') return null
    return (
        <>
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}