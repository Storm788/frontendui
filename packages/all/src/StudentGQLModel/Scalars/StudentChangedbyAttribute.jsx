/**
 * A component for displaying the `changedby` attribute of an student entity.
 *
 * This component checks if the `changedby` attribute exists on the `student` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudentChangedbyAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {*} [props.student.changedby] - The changedby attribute of the student entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <StudentChangedbyAttribute student={studentEntity} />
 */
export const StudentChangedbyAttribute = ({student}) => {
    const {changedby} = student
    if (typeof changedby === 'undefined') return null
    return (
        <>
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}