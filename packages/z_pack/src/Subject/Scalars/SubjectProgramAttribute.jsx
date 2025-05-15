import { ProgramLink } from "../../Program"

/**
 * A component for displaying the `program` attribute of an subject entity.
 *
 * This component checks if the `program` attribute exists on the `subject` object. If `program` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `program` attribute.
 *
 * @component
 * @param {Object} props - The props for the SubjectProgramAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {*} [props.subject.program] - The program attribute of the subject entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `program` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { program: { id: 1, name: "Sample Program" } };
 *
 * <SubjectProgramAttribute subject={subjectEntity} />
 */
export const SubjectProgramAttribute = ({subject}) => {
    const {program} = subject
    if (typeof program === 'undefined') return null
    return (
        <>
            {/* Probably {'<ProgramMediumCard program=\{program\} />'} <br />
            {JSON.stringify(program)} */}
            <ProgramLink program={program} />
        </>
    )
}