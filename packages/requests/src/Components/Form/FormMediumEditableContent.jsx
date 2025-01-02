import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an form entity.
 *
 * This component renders a label "FormMediumContent" followed by a serialized representation of the `form` object
 * and any additional child content. It is designed to handle and display information about an form entity object.
 *
 * @component
 * @param {Object} props - The properties for the FormMediumContent component.
 * @param {Object} props.form - The object representing the form entity.
 * @param {string|number} props.form.id - The unique identifier for the form entity.
 * @param {string} props.form.name - The name or label of the form entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `form` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const formEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FormMediumContent form={formEntity}>
 *   <p>Additional information about the entity.</p>
 * </FormMediumContent>
 */
export const FormMediumEditableContent = ({form, children, onChange=(e)=>null, onBlur=(e)=>null}) => {
    return (<>
        <Input id="name" label={"Název formuláře"} className='form-control' defaultValue={form?.name} onChange={onChange} onBlur={onBlur} />
        <Input id="name_en" label={"Anglický název"} className='form-control' defaultValue={form?.name_en}  onChange={onChange} onBlur={onBlur} />
        {children}
    </>)
}
