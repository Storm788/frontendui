/**
 * A component for displaying the `leveltype` attribute of an programtype entity.
 *
 * This component checks if the `leveltype` attribute exists on the `programtype` object. If `leveltype` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `leveltype` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeLeveltypeAttribute component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {*} [props.programtype.leveltype] - The leveltype attribute of the programtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `leveltype` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { leveltype: { id: 1, name: "Sample Leveltype" } };
 *
 * <ProgramTypeLeveltypeAttribute programtype={programtypeEntity} />
 */
export const ProgramTypeLeveltypeAttribute = ({programtype}) => {
    const {leveltype} = programtype
    if (typeof leveltype === 'undefined') return null
    return (
        <>
            {/* <LeveltypeMediumCard leveltype={leveltype} /> */}
            {/* <LeveltypeLink leveltype={leveltype} /> */}
            Probably {'<LeveltypeMediumCard leveltype=\{leveltype\} />'} <br />
            <pre>{JSON.stringify(leveltype, null, 4)}</pre>
        </>
    )
}