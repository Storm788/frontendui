import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an statetransition entity.
 *
 * This component renders a label "StateTransitionMediumContent" followed by a serialized representation of the `statetransition` object
 * and any additional child content. It is designed to handle and display information about an statetransition entity object.
 *
 * @component
 * @param {Object} props - The properties for the StateTransitionMediumContent component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {string|number} props.statetransition.id - The unique identifier for the statetransition entity.
 * @param {string} props.statetransition.name - The name or label of the statetransition entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `statetransition` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateTransitionMediumContent statetransition={statetransitionEntity}>
 *   <p>Additional information about the entity.</p>
 * </StateTransitionMediumContent>
 */
export const StateTransitionMediumEditableContent = ({statetransition, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={statetransition?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={statetransition?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
