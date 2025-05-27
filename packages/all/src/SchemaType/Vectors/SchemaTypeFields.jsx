import { SchemaTypeLink } from "../Components";

const PrintType = ({type}) => {
    if (!type) return null;
    if (type.kind === "LIST") {
        return (<>
            <span>[</span>
            <PrintType type={type.ofType} />
            <span>]</span>
        </>)
    } else if (type.kind === "NON_NULL") {
        return (<>
            <PrintType type={type.ofType} />!
        </>)
    } else if (type.kind === "SCALAR") {
        return (<>{type.name}</>)
    } else if (type.kind === "OBJECT") {
        return (<SchemaTypeLink schematype={type} />)
    } else {
        return (<>{JSON.stringify(type)}</>)
    }
}

const Field = ({field}) => {
    return (<>
        <div className="field">
            {field.name}: <PrintType type={field.type} /> ({field.description}) 
        </div>
    </>)
}

export const SchemaTypeFields = ({schematype}) => {
    const fields = schematype.fields || [];
    return (<>
        <div className="schema-type-fields">
            <h3>Fields</h3>
            {fields.map((field, index) => (
                <Field key={index} field={field} />
            ))}        
        </div>
    </>)
}