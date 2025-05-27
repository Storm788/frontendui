/**
 * A component for displaying the `type` attribute of an program entity.
 *
 * This component checks if the `type` attribute exists on the `program` object. If `type` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `type` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {*} [props.program.type] - The type attribute of the program entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `type` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { type: { id: 1, name: "Sample Type" } };
 *
 * <ProgramTypeAttribute program={programEntity} />
 */
export const ProgramTypeAttribute = ({program}) => {
    const {type} = program
    if (typeof type === 'undefined') return null
    return (
        <>
            Probably {'<TypeMediumCard type=\{type\} />'} <br />
            <pre>{JSON.stringify(type, null, 4)}</pre>
        </>
    )
}