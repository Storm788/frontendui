import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an state entity.
 *
 * This component renders a label "StateMediumContent" followed by a serialized representation of the `state` object
 * and any additional child content. It is designed to handle and display information about an state entity object.
 *
 * @component
 * @param {Object} props - The properties for the StateMediumContent component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {string|number} props.state.id - The unique identifier for the state entity.
 * @param {string} props.state.name - The name or label of the state entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `state` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const stateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateMediumContent state={stateEntity}>
 *   <p>Additional information about the entity.</p>
 * </StateMediumContent>
 */
export const StateMediumEditableContent = ({state, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={state?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={state?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
