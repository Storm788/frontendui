/**
 * A component that displays medium-level content for an program entity.
 *
 * This component renders a label "ProgramMediumContent" followed by a serialized representation of the `program` object
 * and any additional child content. It is designed to handle and display information about an program entity object.
 *
 * @component
 * @param {Object} props - The properties for the ProgramMediumContent component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {string|number} props.program.id - The unique identifier for the program entity.
 * @param {string} props.program.name - The name or label of the program entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `program` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const programEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramMediumContent program={programEntity}>
 *   <p>Additional information about the entity.</p>
 * </ProgramMediumContent>
 */
export const ProgramMediumContent = ({program, children}) => {
    return (
        <>
            DEMONSTRACE PRO STUDENTY {program.name} <br />
            ProgramMediumContent <br />
            {JSON.stringify(program)}
            {program.name}
            {children}
        </>
    )
}
