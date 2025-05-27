/**
 * A component for displaying the `createdby` attribute of an programlanguagetype entity.
 *
 * This component checks if the `createdby` attribute exists on the `programlanguagetype` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramLanguageTypeCreatedbyAttribute component.
 * @param {Object} props.programlanguagetype - The object representing the programlanguagetype entity.
 * @param {*} [props.programlanguagetype.createdby] - The createdby attribute of the programlanguagetype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programlanguagetypeEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <ProgramLanguageTypeCreatedbyAttribute programlanguagetype={programlanguagetypeEntity} />
 */
export const ProgramLanguageTypeCreatedbyAttribute = ({programlanguagetype}) => {
    const {createdby} = programlanguagetype
    if (typeof createdby === 'undefined') return null
    return (
        <>
            {/* <CreatedbyMediumCard createdby={createdby} /> */}
            {/* <CreatedbyLink createdby={createdby} /> */}
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}