import { SchemaLargeCard } from "../Components";
import { SchemaReadAsyncAction } from "../Queries/SchemaReadAsyncAction";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { SchemaTypes } from "../Vectors/SchemaTypes";
import { SchemaTests } from "../Components/SchemaTests";

export const SchemaPage = () => {

    const {loading, error, fetch, entity} = useAsyncAction(SchemaReadAsyncAction, {id: "schema"});
    
    return (<>
        {loading && <div>Loading...</div>}
        {error && <div>Error: <pre>{JSON.stringify(error, null, 4)}</pre></div>}
        {entity && (
            <SchemaLargeCard schema={entity}>
                {/* <SchemaTypes schema={entity} /> */}
                {/* {JSON.stringify(entity, null, 4)} */}
                <SchemaTests schema={entity} />
                <SchemaTypes schema={entity} />
            </SchemaLargeCard>
        )}
    </>)
}