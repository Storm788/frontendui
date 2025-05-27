import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an topic entity.
 *
 * This component renders a label "TopicMediumContent" followed by a serialized representation of the `topic` object
 * and any additional child content. It is designed to handle and display information about an topic entity object.
 *
 * @component
 * @param {Object} props - The properties for the TopicMediumContent component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {string|number} props.topic.id - The unique identifier for the topic entity.
 * @param {string} props.topic.name - The name or label of the topic entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `topic` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const topicEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TopicMediumContent topic={topicEntity}>
 *   <p>Additional information about the entity.</p>
 * </TopicMediumContent>
 */
export const TopicMediumEditableContent = ({topic, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={topic?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={topic?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
