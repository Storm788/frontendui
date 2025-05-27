import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an facility entity.
 *
 * This component renders a label "FacilityMediumContent" followed by a serialized representation of the `facility` object
 * and any additional child content. It is designed to handle and display information about an facility entity object.
 *
 * @component
 * @param {Object} props - The properties for the FacilityMediumContent component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {string|number} props.facility.id - The unique identifier for the facility entity.
 * @param {string} props.facility.name - The name or label of the facility entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `facility` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const facilityEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FacilityMediumContent facility={facilityEntity}>
 *   <p>Additional information about the entity.</p>
 * </FacilityMediumContent>
 */
export const FacilityMediumEditableContent = ({facility, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={facility?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={facility?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
