import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an lessontype entity.
 *
 * This component renders a label "LessonTypeMediumContent" followed by a serialized representation of the `lessontype` object
 * and any additional child content. It is designed to handle and display information about an lessontype entity object.
 *
 * @component
 * @param {Object} props - The properties for the LessonTypeMediumContent component.
 * @param {Object} props.lessontype - The object representing the lessontype entity.
 * @param {string|number} props.lessontype.id - The unique identifier for the lessontype entity.
 * @param {string} props.lessontype.name - The name or label of the lessontype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `lessontype` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const lessontypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <LessonTypeMediumContent lessontype={lessontypeEntity}>
 *   <p>Additional information about the entity.</p>
 * </LessonTypeMediumContent>
 */
export const LessonTypeMediumEditableContent = ({lessontype, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={lessontype?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={lessontype?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
