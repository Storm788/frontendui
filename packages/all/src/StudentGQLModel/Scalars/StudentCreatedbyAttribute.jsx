/**
 * A component for displaying the `createdby` attribute of an student entity.
 *
 * This component checks if the `createdby` attribute exists on the `student` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudentCreatedbyAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {*} [props.student.createdby] - The createdby attribute of the student entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <StudentCreatedbyAttribute student={studentEntity} />
 */
export const StudentCreatedbyAttribute = ({student}) => {
    const {createdby} = student
    if (typeof createdby === 'undefined') return null
    return (
        <>
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}