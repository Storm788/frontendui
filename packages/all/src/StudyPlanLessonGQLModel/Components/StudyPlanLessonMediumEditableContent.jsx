import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an studyplanlesson entity.
 *
 * This component renders a label "StudyPlanLessonMediumContent" followed by a serialized representation of the `studyplanlesson` object
 * and any additional child content. It is designed to handle and display information about an studyplanlesson entity object.
 *
 * @component
 * @param {Object} props - The properties for the StudyPlanLessonMediumContent component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the studyplanlesson entity.
 * @param {string} props.studyplanlesson.name - The name or label of the studyplanlesson entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `studyplanlesson` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyPlanLessonMediumContent studyplanlesson={studyplanlessonEntity}>
 *   <p>Additional information about the entity.</p>
 * </StudyPlanLessonMediumContent>
 */
export const StudyPlanLessonMediumEditableContent = ({studyplanlesson, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={studyplanlesson?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={studyplanlesson?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
