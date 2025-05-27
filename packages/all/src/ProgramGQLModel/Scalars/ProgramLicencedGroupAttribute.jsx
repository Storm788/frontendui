/**
 * A component for displaying the `licencedgroup` attribute of an program entity.
 *
 * This component checks if the `licencedgroup` attribute exists on the `program` object. If `licencedgroup` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `licencedgroup` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLicencedgroupAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {*} [props.program.licencedgroup] - The licencedgroup attribute of the program entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `licencedgroup` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { licencedgroup: { id: 1, name: "Sample Licencedgroup" } };
 *
 * <ProgramLicencedgroupAttribute program={programEntity} />
 */
export const ProgramLicencedgroupAttribute = ({program}) => {
    const {licencedgroup} = program
    if (typeof licencedgroup === 'undefined') return null
    return (
        <>
            Probably {'<LicencedgroupMediumCard licencedgroup=\{licencedgroup\} />'} <br />
            <pre>{JSON.stringify(licencedgroup, null, 4)}</pre>
        </>
    )
}