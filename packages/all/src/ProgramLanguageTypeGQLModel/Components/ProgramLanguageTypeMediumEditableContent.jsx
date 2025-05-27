import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an programlanguagetype entity.
 *
 * This component renders a label "ProgramLanguageTypeMediumContent" followed by a serialized representation of the `programlanguagetype` object
 * and any additional child content. It is designed to handle and display information about an programlanguagetype entity object.
 *
 * @component
 * @param {Object} props - The properties for the ProgramLanguageTypeMediumContent component.
 * @param {Object} props.programlanguagetype - The object representing the programlanguagetype entity.
 * @param {string|number} props.programlanguagetype.id - The unique identifier for the programlanguagetype entity.
 * @param {string} props.programlanguagetype.name - The name or label of the programlanguagetype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `programlanguagetype` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const programlanguagetypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramLanguageTypeMediumContent programlanguagetype={programlanguagetypeEntity}>
 *   <p>Additional information about the entity.</p>
 * </ProgramLanguageTypeMediumContent>
 */
export const ProgramLanguageTypeMediumEditableContent = ({programlanguagetype, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={programlanguagetype?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={programlanguagetype?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
