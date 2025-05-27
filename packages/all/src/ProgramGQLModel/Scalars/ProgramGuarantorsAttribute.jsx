/**
 * A component for displaying the `guarantors` attribute of an program entity.
 *
 * This component checks if the `guarantors` attribute exists on the `program` object. If `guarantors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `guarantors` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramGuarantorsAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {*} [props.program.guarantors] - The guarantors attribute of the program entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `guarantors` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { guarantors: { id: 1, name: "Sample Guarantors" } };
 *
 * <ProgramGuarantorsAttribute program={programEntity} />
 */
export const ProgramGuarantorsAttribute = ({program}) => {
    const {guarantors} = program
    if (typeof guarantors === 'undefined') return null
    return (
        <>
            Probably {'<GuarantorsMediumCard guarantors=\{guarantors\} />'} <br />
            <pre>{JSON.stringify(guarantors, null, 4)}</pre>
        </>
    )
}