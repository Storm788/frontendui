import { useSelector } from 'react-redux';
import { SchemaTypeLargeCard, SchemaTypeOperations } from "../Components";
import { useParams } from 'react-router';
import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { SchemaReadAsyncAction } from '../../Schema/Queries';
import { SchemaTypeFields } from '../Vectors';

export const SchemaTypePage = () => {
    const { id } = useParams();
    const { loading, entity: schema } = useAsyncAction(SchemaReadAsyncAction, { id: "schema" });
    
    const types = schema?.types || [];
    const item = types.find((item) => item.name === id);
    
    return (<>
        {loading && <div>Loading...</div>}
        {item && (
            <SchemaTypeLargeCard schematype={item}>
                <SchemaTypeOperations schema={schema} schematype={item} />
                <SchemaTypeFields id="fields" schematype={item} />
            </SchemaTypeLargeCard>
        )}
    </>)
}