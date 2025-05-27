/**
 * A component for displaying the `student` attribute of an student entity.
 *
 * This component checks if the `student` attribute exists on the `student` object. If `student` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `student` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudentStudentAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {*} [props.student.student] - The student attribute of the student entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `student` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { student: { id: 1, name: "Sample Student" } };
 *
 * <StudentStudentAttribute student={studentEntity} />
 */
export const StudentStudentAttribute = ({student}) => {
    const {student} = student
    if (typeof student === 'undefined') return null
    return (
        <>
            Probably {'<StudentMediumCard student=\{student\} />'} <br />
            <pre>{JSON.stringify(student, null, 4)}</pre>
        </>
    )
}