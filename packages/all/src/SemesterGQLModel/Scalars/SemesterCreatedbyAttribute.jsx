/**
 * A component for displaying the `createdby` attribute of an semester entity.
 *
 * This component checks if the `createdby` attribute exists on the `semester` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the SemesterCreatedbyAttribute component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {*} [props.semester.createdby] - The createdby attribute of the semester entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <SemesterCreatedbyAttribute semester={semesterEntity} />
 */
export const SemesterCreatedbyAttribute = ({semester}) => {
    const {createdby} = semester
    if (typeof createdby === 'undefined') return null
    return (
        <>
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}