import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an programformtype entity.
 *
 * This component renders a label "ProgramFormTypeMediumContent" followed by a serialized representation of the `programformtype` object
 * and any additional child content. It is designed to handle and display information about an programformtype entity object.
 *
 * @component
 * @param {Object} props - The properties for the ProgramFormTypeMediumContent component.
 * @param {Object} props.programformtype - The object representing the programformtype entity.
 * @param {string|number} props.programformtype.id - The unique identifier for the programformtype entity.
 * @param {string} props.programformtype.name - The name or label of the programformtype entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `programformtype` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const programformtypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramFormTypeMediumContent programformtype={programformtypeEntity}>
 *   <p>Additional information about the entity.</p>
 * </ProgramFormTypeMediumContent>
 */
export const ProgramFormTypeMediumEditableContent = ({programformtype, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={programformtype?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={programformtype?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
