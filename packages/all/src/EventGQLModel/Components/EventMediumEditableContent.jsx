import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an event entity.
 *
 * This component renders a label "EventMediumContent" followed by a serialized representation of the `event` object
 * and any additional child content. It is designed to handle and display information about an event entity object.
 *
 * @component
 * @param {Object} props - The properties for the EventMediumContent component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {string|number} props.event.id - The unique identifier for the event entity.
 * @param {string} props.event.name - The name or label of the event entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `event` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const eventEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EventMediumContent event={eventEntity}>
 *   <p>Additional information about the entity.</p>
 * </EventMediumContent>
 */
export const EventMediumEditableContent = ({event, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={event?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={event?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
