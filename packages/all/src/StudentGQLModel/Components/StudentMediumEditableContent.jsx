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
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={student?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={student?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
