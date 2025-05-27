/**
 * A component for displaying the `formtype` attribute of an programtype entity.
 *
 * This component checks if the `formtype` attribute exists on the `programtype` object. If `formtype` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `formtype` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTypeFormtypeAttribute component.
 * @param {Object} props.programtype - The object representing the programtype entity.
 * @param {*} [props.programtype.formtype] - The formtype attribute of the programtype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `formtype` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtypeEntity = { formtype: { id: 1, name: "Sample Formtype" } };
 *
 * <ProgramTypeFormtypeAttribute programtype={programtypeEntity} />
 */
export const ProgramTypeFormtypeAttribute = ({programtype}) => {
    const {formtype} = programtype
    if (typeof formtype === 'undefined') return null
    return (
        <>
            {/* <FormtypeMediumCard formtype={formtype} /> */}
            {/* <FormtypeLink formtype={formtype} /> */}
            Probably {'<FormtypeMediumCard formtype=\{formtype\} />'} <br />
            <pre>{JSON.stringify(formtype, null, 4)}</pre>
        </>
    )
}