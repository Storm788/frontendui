import { useMemo } from 'react';
import { buildExpandedMutation, buildQueryPage, buildQueryScalar, getDeleteMutations, getInsertMutations, getReadScalarValue, getReadVectorValue, getUpdateMutations } from '../../_utils/utils';

const GQLQuery = ({query, params}) => {
    const paramString = JSON.stringify(params, null, 2)
    return (<>
        <b>Query</b>
        <pre>{query}</pre>
        {params && (<><b>Params</b>
        <pre>{paramString}</pre></>)}
    </>)
}

const SchemaTypeOperationScalar = ({schema, operation}) => {
    const queryRP = buildQueryPage(schema, operation)
    const queryR = buildQueryScalar(schema, operation)
    return (<>
        <GQLQuery query={queryR} />
    </>)
}

const SchemaTypeOperationVector = ({schema, operation}) => {
    const queryRP = buildQueryPage(schema, operation)
    return (<>
        <GQLQuery query={queryRP} />
    </>)
}

const SchemaTypeOperationInsert = ({schema, operation}) => {
    const queryI = buildExpandedMutation(schema, operation)
    return (<>
        <GQLQuery query={queryI} />
    </>)
}

const SchemaTypeOperationUpdate = ({schema, operation}) => {
    const queryU = buildExpandedMutation(schema, operation)
    return (<>
        <GQLQuery query={queryU} />
    </>)
}

const SchemaTypeOperationDelete = ({schema, operation}) => {
    const queryD = buildExpandedMutation(schema, operation)
    return (<>
        <GQLQuery query={queryD} />
    </>)
}


const SchemaTypeOperation = ({schema, operation, operationtype}) => {
    return (<>
        {(operationtype === 'scalar') && (<SchemaTypeOperationScalar schema={schema} operation={operation} />)}
        {(operationtype === 'vector') && (<SchemaTypeOperationVector schema={schema} operation={operation} />)}
        {(operationtype === 'insert') && (<SchemaTypeOperationInsert schema={schema} operation={operation} />)}
        {(operationtype === 'update') && (<SchemaTypeOperationUpdate schema={schema} operation={operation} />)}
        {(operationtype === 'delete') && (<SchemaTypeOperationDelete schema={schema} operation={operation} />)}
    </>)
}

export const SchemaTypeOperations = ({schema, schematype}) => {
    const ScalarOperations = useMemo(
        () => getReadScalarValue(schema, schematype?.name),
        [schema, schematype?.name]
    );

    const VectorOperations = useMemo(
        () => getReadVectorValue(schema, schematype?.name),
        [schema, schematype?.name]
    );

    const InsertOperations = useMemo(
        () => getInsertMutations(schema, schematype?.name),
        [schema, schematype?.name]
    );

    const UpdateOperations = useMemo(
        () => getUpdateMutations(schema, schematype?.name),
        [schema, schematype?.name]
    );

    const DeleteOperations = useMemo(
        () => getDeleteMutations(schema, schematype?.name),
        [schema, schematype?.name]
    );

    return (<>
        {ScalarOperations.map((operation) => (<SchemaTypeOperation key={operation.name} schema={schema} operation={operation} operationtype={'scalar'} />))}
        {VectorOperations.map((operation) => (<SchemaTypeOperation key={operation.name} schema={schema} operation={operation} operationtype={'vector'} />))}
        {InsertOperations.map((operation) => (<SchemaTypeOperation key={operation.name} schema={schema} operation={operation} operationtype={'insert'} />))}
        {UpdateOperations.map((operation) => (<SchemaTypeOperation key={operation.name} schema={schema} operation={operation} operationtype={'update'} />))}
        {DeleteOperations.map((operation) => (<SchemaTypeOperation key={operation.name} schema={schema} operation={operation} operationtype={'delete'} />))}
    </>)
}