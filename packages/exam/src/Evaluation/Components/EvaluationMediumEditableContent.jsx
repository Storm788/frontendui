import { Input } from "@hrbolek/uoisfrontend-shared"


/**
 * A component that displays medium-level content for an evaluation entity.
 *
 * This component renders a label "EvaluationMediumContent" followed by a serialized representation of the `evaluation` object
 * and any additional child content. It is designed to handle and display information about an evaluation entity object.
 *
 * @component
 * @param {Object} props - The properties for the EvaluationMediumContent component.
 * @param {Object} props.evaluation - The object representing the evaluation entity.
 * @param {string|number} props.evaluation.id - The unique identifier for the evaluation entity.
 * @param {string} props.evaluation.name - The name or label of the evaluation entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `evaluation` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const evaluationEntity = { id: 123, name: "Sample Entity" };
 * 
 * <EvaluationMediumContent evaluation={evaluationEntity}>
 *   <p>Additional information about the entity.</p>
 * </EvaluationMediumContent>
 */
export const EvaluationMediumEditableContent = ({evaluation, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"points"} label={"Body"} className="form-control" defaultValue={evaluation?.points|| "0-100"} onChange={onChange} onBlur={onBlur} />
            <Input id={"grade"} label={"Známka"} className="form-control" defaultValue={evaluation?.grade|| "A-F"} onChange={onChange} onBlur={onBlur}/>
            <Input id={"passed"} label={"Výsledek zkoušky"} type="checkbox" className="form-check-input" defaultChecked={evaluation?.passed|| false} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
