/**
 * A component for displaying the `program` attribute of an student entity.
 *
 * This component checks if the `program` attribute exists on the `student` object. If `program` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `program` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudentProgramAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {*} [props.student.program] - The program attribute of the student entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `program` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { program: { id: 1, name: "Sample Program" } };
 *
 * <StudentProgramAttribute student={studentEntity} />
 */
export const StudentProgramAttribute = ({student}) => {
    const {program} = student
    if (typeof program === 'undefined') return null
    return (
        <>
            Probably {'<ProgramMediumCard program=\{program\} />'} <br />
            <pre>{JSON.stringify(program, null, 4)}</pre>
        </>
    )
}