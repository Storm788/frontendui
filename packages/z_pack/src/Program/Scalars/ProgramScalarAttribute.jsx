/**
 * A component for displaying the `scalar` attribute of an program entity.
 *
 * This component checks if the `scalar` attribute exists on the `program` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramScalarAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {*} [props.program.scalar] - The scalar attribute of the program entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <ProgramScalarAttribute program={programEntity} />
 */
export const ProgramScalarAttribute = ({program}) => {
    const {scalar} = program
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}