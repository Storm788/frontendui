import { SchemaTypeLink } from "../../SchemaType";

export const SchemaTypes = ({schema}) => {
    const { types } = schema || [];
    const notNullTypes = types
        .filter((type) => type && type.kind !== 'NON_NULL')
        .filter((type) => type && type.kind === 'OBJECT')
        
    return (
        <div className="schema-types">
        <h2>Schema Types</h2>
        <ul>
            
        
        {notNullTypes.map((schematype) => (
            <li key={schematype.name}>
                <SchemaTypeLink schematype={{...schematype, id:schematype?.name}} />
            </li>
        ))}
        </ul>
        <pre>{JSON.stringify(types, null, 2)}</pre>
        </div>
    );
}