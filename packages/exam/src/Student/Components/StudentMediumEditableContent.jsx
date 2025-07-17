import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an student entity.
 *
 * This component renders a label "StudentMediumContent" followed by a serialized representation of the `student` object
 * and any additional child content. It is designed to handle and display information about an student entity object.
 *
 * @component
 * @param {Object} props - The properties for the StudentMediumContent component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name or label of the student entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `student` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const studentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentMediumContent student={studentEntity}>
 *   <p>Additional information about the entity.</p>
 * </StudentMediumContent>
 */
export const StudentMediumEditableContent = ({student, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"semesterNumber"} label={"Semester"} className="number" defaultValue={student?.semesterNumber|| "1"} onChange={onChange} onBlur={onBlur} />
            <Input id={"programId"} label={"ID programu"} className="number" defaultValue={student?.programId|| "0ac1761b-0ec7-4fc2-b4d7-127e79a316eb"} onChange={onChange} onBlur={onBlur} />
            <Input id={"stateId"} label={"ID stavu"} className="number" defaultValue={student?.stateId|| "6c96b893-ca09-4b6f-9fbb-5359c589927b"} onChange={onChange} onBlur={onBlur} />
            <Input id={"userId"} label={"ID uživatele"} className="number" defaultValue={student?.userId|| "da2ddc37-adc8-471e-a502-8de0aae1b77a"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
