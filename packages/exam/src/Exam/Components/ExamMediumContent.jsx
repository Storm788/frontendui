/**
 * A component that displays medium-level content for an exam entity.
 *
 * This component renders a label "ExamMediumContent" followed by a serialized representation of the `exam` object
 * and any additional child content. It is designed to handle and display information about an exam entity object.
 *
 * @component
 * @param {Object} props - The properties for the ExamMediumContent component.
 * @param {Object} props.exam - The object representing the exam entity.
 * @param {string|number} props.exam.id - The unique identifier for the exam entity.
 * @param {string} props.exam.name - The name or label of the exam entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `exam` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const examEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ExamMediumContent exam={examEntity}>
 *   <p>Additional information about the entity.</p>
 * </ExamMediumContent>
 */
/*
export const ExamMediumContent = ({exam, children}) => {
    console.log("ExamMediumContent", exam)
    return (
        <>
        ID: {exam.id} <br/>
        Name: {exam.name} <br/>
        Max Score: {exam.maxScore} <br/>
        Min Score: {exam.minScore} <br/>
        </>
    )
}
*/
export const ExamMediumContent = ({exam, children}) => {
    return (
        <>
            ID:({exam.id}) <br/>
            Name: {exam.name} <br/>
            Maximální skóre: {exam.maxScore} <br/>
            Minimální skóre: {exam.minScore} <br/>
            Last Change: {exam.lastchange} <br/>
            {/* UserMediumContent <br />
            {JSON.stringify(user)} */}
            {children}
        </>
    )
}