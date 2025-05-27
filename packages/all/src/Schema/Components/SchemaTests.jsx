import { useState, useEffect, useMemo } from 'react'

import { CardCapsule, useMe } from "@hrbolek/uoisfrontend-shared";
import { buildExpandedMutation, buildQueryPage, buildQueryScalar, getDeleteMutations, getInsertMutations, getReadScalarValue, getReadVectorValue, getUpdateMutations, gqlFetch, unwrapType, URI, useMutationInsertTest, useMutationUpdateTest, useQueryScalarTest, useQueryVectorTest } from "../../_utils/utils";
import { Accordion, AccordionHeader, AccordionItem, Card } from "react-bootstrap";

const TypeDeleteTest = ({schema, typename, variables}) => {  
    const { loading: vectorLoading, error: vectorError, data: vectorData} = useQueryVectorTest(schema, typename);
    const id = vectorData && vectorData.length > 0 && vectorData[0]?.id;
    const { loading: scalarLoading, error: scalarError, data: scalarData} = useQueryScalarTest(schema, typename, {id});

    const { loading: insertLoading, error: insertError, data: insertData} = useMutationInsertTest(schema, typename, scalarData);
    const { loading: updateLoading, error: updateError, data: updateData} = useMutationUpdateTest(schema, typename, insertData);
    const { loading: deleteLoading, error: deleteError, data: deleteData} = useMutationDeleteTest(schema, typename, updateData);

    const scalarQueries = getReadScalarValue(schema, typename)

    return (<>
        <CardCapsule title={`${typename} tests`}>

        
        {vectorLoading && <div>Loading vector...</div>}
        {vectorError && <div>Error vector: <pre>{JSON.stringify(vectorError, null, 4)}</pre></div>}
        {scalarLoading && <div>Loading scalar...</div>}
        {scalarError && <div>Error scalar: <pre>{JSON.stringify(scalarError, null, 4)}</pre></div>}
        {insertLoading && <div>Loading insert...</div>}
        {insertError && <div>Error insert: <pre>{JSON.stringify(insertError, null, 4)}</pre></div>}
        {updateLoading && <div>Loading update...</div>}
        {updateError && <div>Error update: <pre>{JSON.stringify(updateError, null, 4)}</pre></div>}
        {deleteLoading && <div>Loading delete...</div>}
        {deleteError && <div>Error delete: <pre>{JSON.stringify(deleteError, null, 4)}</pre></div>}

        <div>Type: {typename}</div>
        <div>Fields:</div>
        <ul>
            {fields.map((field) => (
                <li key={field.name}>
                    {field.name}: {unwrapType(field.type).name}
                </li>
            ))}
        </ul>
        </CardCapsule>
    </>)
}

const TypeUpdateTest = ({schema, typename, variables}) => {  
    const { loading: vectorLoading, error: vectorError, data: vectorData} = useQueryVectorTest(schema, typename);
    const id = vectorData && vectorData.length > 0 && vectorData[0]?.id;
    const { loading: scalarLoading, error: scalarError, data: scalarData} = useQueryScalarTest(schema, typename, {id});

    const { loading: insertLoading, error: insertError, data: insertData} = useMutationInsertTest(schema, typename, scalarData);
    const { loading: updateLoading, error: updateError, data: updateData} = useMutationUpdateTest(schema, typename, insertData);
    const { loading: deleteLoading, error: deleteError, data: deleteData} = useMutationDeleteTest(schema, typename, updateData);

    const scalarQueries = getReadScalarValue(schema, typename)

    return (<>
        <CardCapsule title={`${typename} tests`}>

        
        {vectorLoading && <div>Loading vector...</div>}
        {vectorError && <div>Error vector: <pre>{JSON.stringify(vectorError, null, 4)}</pre></div>}
        {scalarLoading && <div>Loading scalar...</div>}
        {scalarError && <div>Error scalar: <pre>{JSON.stringify(scalarError, null, 4)}</pre></div>}
        {insertLoading && <div>Loading insert...</div>}
        {insertError && <div>Error insert: <pre>{JSON.stringify(insertError, null, 4)}</pre></div>}
        {updateLoading && <div>Loading update...</div>}
        {updateError && <div>Error update: <pre>{JSON.stringify(updateError, null, 4)}</pre></div>}
        {deleteLoading && <div>Loading delete...</div>}
        {deleteError && <div>Error delete: <pre>{JSON.stringify(deleteError, null, 4)}</pre></div>}

        <div>Type: {typename}</div>
        <div>Fields:</div>
        <ul>
            {fields.map((field) => (
                <li key={field.name}>
                    {field.name}: {unwrapType(field.type).name}
                </li>
            ))}
        </ul>
        </CardCapsule>
    </>)
}

const TypeInsertTest = ({schema, typename, operationname, variables}) => {  

    const { loading: insertLoading, error: insertError, data: insertData, query} = useMutationInsertTest(schema, operationname, variables);
    const { id } = insertData || {}
    const updateMutations = getUpdateMutations(schema, typename)

    return (<>
        <Accordion.Item eventKey={`${operationname}`}>
            <Accordion.Header className={insertError?"bg-danger":"bg-success"}>
                Query.{operationname} {"->"} {typename}
            </Accordion.Header>        
            <Accordion.Body className={insertError?"bg-danger":"bg-success"}>
                {insertLoading && <div>Loading scalar...</div>}
                {insertError && <div>Error scalar: <pre>{JSON.stringify(insertError, null, 4)}</pre></div>}
                {query && (<div>
                    <pre>{query}</pre>
                </div>)}
                {insertData && (<div>
                    <pre>{JSON.stringify(insertData, null, 4)}</pre>
                </div>)}
            
            </Accordion.Body>
        </Accordion.Item>
    </>)
}

const TypeScalarTest = ({schema, typename, operationname, variables}) => {  
    const { loading, error, query, data: scalarData} = useQueryScalarTest(schema, operationname, variables);
    const { id } = variables
    const insertQueries = getInsertMutations(schema, typename)

    return (<>
        
            <Accordion.Item eventKey={id}>
                <Accordion.Header className={error?"bg-danger":"bg-success"}>
                    Query.{operationname} {"->"} {typename}
                </Accordion.Header>        
                <Accordion.Body className={error?"bg-danger":"bg-success"}>
                    {loading && <div>Loading scalar...</div>}
                    {error && <div>Error scalar: <pre>{JSON.stringify(error, null, 4)}</pre></div>}
                    {query && (<div>
                        <pre>{query}</pre>
                    </div>)}
                    {scalarData && (<div>
                        <pre>{JSON.stringify(scalarData, null, 4)}</pre>
                    </div>)}
                
                </Accordion.Body>
            </Accordion.Item>
            {insertQueries.map(operationname => <TypeInsertTest key={operationname} schema={schema} typename={typename} variables={scalarData} operationname={operationname} />)}
        
    </>)
}

const TypePageTest = ({schema, typename, operationname}) => {  
    const { loading: vectorLoading, error: vectorError, query, data: vectorData} = useQueryVectorTest(schema, operationname);
    const id = vectorData && vectorData.length > 0 && vectorData[0]?.id;

    const scalarQueries = useMemo(() => getReadScalarValue(schema, typename), [schema, typename])

    return (<>
        <Accordion>    
            <Accordion.Item eventKey={operationname}>
                <Accordion.Header className={vectorError?"bg-danger":"bg-success"} as="div">
                Query.{operationname} {"->"} List[{typename}!]!
                </Accordion.Header>
                <Accordion.Body className={vectorError?"bg-danger":"bg-success"}>
                    {vectorLoading && <div>Loading vector...</div>}
                    {vectorError && <div>Error vector: <pre>{JSON.stringify(vectorError, null, 4)}</pre></div>}
                    {query && (<div>
                        <pre>{query}</pre>
                    </div>)}

                    {vectorData && (<div>
                        <pre>{JSON.stringify(vectorData, null, 4)}</pre>
                    </div>)}
                </Accordion.Body>
            </Accordion.Item>
        
            {!vectorError && vectorData && (<div>
                {scalarQueries.map(operationname => <TypeScalarTest schema={schema} typename={typename} operationname={operationname} variables={{id}} />)}
            </div>)}
        </Accordion>
    </>)
}

const TypeTests = ({schema, typename}) => {  
    const vectorQueries_ = useMemo(() => getReadVectorValue(schema, typename), [typename])
    const vectorQueries = vectorQueries_.slice(0, 1)

    return (<>
        <CardCapsule title={`${typename} tests`}>
            {JSON.stringify(vectorQueries)}
            {vectorQueries.map(operationname => <TypePageTest key={operationname} schema={schema} typename={typename} operationname={operationname} />)}
        </CardCapsule>
    </>)
}


const TypeChainTest = ({schema, typename}) => {
    const vectorQueries = useMemo(() => getReadVectorValue(schema, typename), [schema, typename])
    const scalarQueries = useMemo(() => getReadScalarValue(schema, typename), [schema, typename])
    const insertQueries = useMemo(() => getInsertMutations(schema, typename), [schema, typename])
    const updateQueries = useMemo(() => getUpdateMutations(schema, typename), [schema, typename])
    const deleteQueries = useMemo(() => getDeleteMutations(schema, typename), [schema, typename])

    const [vectorResponses, setVectorResponses] = useState({});
    const [scalarResponses, setScalarResponses] = useState({});
    const [insertResponses, setInsertResponses] = useState({});
    const [updateResponses, setUpdateResponses] = useState({});
    const [deleteResponses, setDeleteResponses]   = useState({});    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [rerun, setRerun] = useState(0)

    useEffect(() => {
        let isMounted = true;

        const runAll = async () => {
            // 1) Vector reads
            const vResults = {};
            for (const op of vectorQueries) {
                try {
                    const json = await gqlFetch(URI, buildQueryPage(schema, op));
                    vResults[op] = json;
                } catch (err) {
                    console.error(`Error in ${op}`, err);
                    vResults[op] = {errors: [JSON.stringify(err)]};
                    setError(err)
                }
            }
            if (!isMounted) return;
            setVectorResponses(vResults);

            const firstOp = vectorQueries[0];
            const arr = vResults[firstOp]?.data?.[firstOp] || [];
            const firstId = Array.isArray(arr) ? arr[0]?.id : null;
            // setId(firstId);

            // 2) Scalar reads
            let baseEntity = null;
            if (firstId) {
                const sResults = {};
                for (const op of scalarQueries) {
                    try {
                        const json = await gqlFetch(URI, buildQueryScalar(schema, op), { id: firstId });
                        sResults[op] = json;
                        baseEntity = json?.data?.[op];
                    } catch (err) {
                        console.error(`Error in ${op}`, err);
                        sResults[op] = {errors: [JSON.stringify(err)]};
                        setError(err)
                    }
                }
                if (!isMounted) return;
                setScalarResponses(sResults);

                if (baseEntity) {
                    delete baseEntity.id;
                    delete baseEntity.lastchange;
                }
            }

            // 3) Inserts
            const deleteQuery = buildExpandedMutation(schema, deleteQueries[0])
            if (baseEntity) {
                const iResults = {};
                for (const op of insertQueries) {
                    try {
                        const json = await gqlFetch(URI, buildExpandedMutation(schema, op), baseEntity);
                        iResults[op] = json;
                        const ent = json?.data?.[op];
                        
                        // delete it immediatelly
                        await gqlFetch(URI, deleteQuery, ent)
                    } catch (err) {
                        console.error(`Insert error ${op}`, err);
                        iResults[op] = {errors: [err?.message || JSON.stringify(err)]};
                        setError(err)
                    }
                }
                if (!isMounted) return;
                setInsertResponses(iResults);
            }

            const insertOp = insertQueries[0]
            const insertQuery = buildExpandedMutation(schema, insertOp)

            // 4) Updates
            if (baseEntity) {    
                const uResults = {};
                for (const op of updateQueries) {
                    try {
                        const insertedJson = await gqlFetch(URI, insertQuery, baseEntity);
                        const updatedEntity = insertedJson?.data?.[insertOp]

                        const json = await gqlFetch(URI, buildExpandedMutation(schema, op), updatedEntity);
                        uResults[op] = json;
                    } catch (err) {
                        console.error(`Update error ${op}`, err);
                        uResults[op] = {errors: [err?.message || JSON.stringify(err)]};
                        setError(err)
                    }
                }
                if (!isMounted) return;
                setUpdateResponses(uResults);
            }

            // 5) Deletes
            if (baseEntity) {
                const dResults = {};
                for (const op of deleteQueries) {
                    try {
                        const insertedJson = await gqlFetch(URI, insertQuery, baseEntity);
                        const updatedEntity = insertedJson?.data?.[insertOp]
                        const json = await gqlFetch(URI, buildExpandedMutation(schema, op), updatedEntity);
                        dResults[op] = json;
                    } catch (err) {
                        console.error(`Delete error ${op}`, err);
                        dResults[op] = {errors: [err?.message || JSON.stringify(err)]};
                        setError(err)
                    }
                }
                if (!isMounted) return;
                setDeleteResponses(dResults);
            }
            setLoading(false);
        };

        runAll();

        return () => {
            isMounted = false;
        };
    }, [
        schema,
        vectorQueries,
        scalarQueries,
        insertQueries,
        updateQueries,
        deleteQueries,
        rerun
    ]);

    const onClickRerun = (e) => {
        setRerun(rerun+1)
        e.preventDefault()
    }
    return (<>
        {/* {loading && "Loading"} */}
        { (
        <Accordion.Item eventKey={typename}>
            <Accordion.Header style={{'--bs-accordion-btn-bg': (error?'var(--bs-danger)':'var(--bs-success)')}}>
                <span className=''>{typename} - Summary ✔️❌</span>
                <button className='btn btn-primary' onClick={onClickRerun}>Rerun</button>
            </Accordion.Header>
            <Accordion.Body>
                {insertQueries.length == 0 && "Missing insert ops"}<br />
                {updateQueries.length == 0 && "Missing update ops"}<br />
                {deleteQueries.length == 0 && "Missing delete ops"}<br />
                <pre>{JSON.stringify(insertQueries)}</pre>
                <pre>{JSON.stringify(updateQueries)}</pre>
                <pre>{JSON.stringify(deleteQueries)}</pre>
                <Accordion>
                    <Accordion.Item eventKey={`${typename} - vector reads`}>
                        <Accordion.Header>{`${typename} - Vector reads`}</Accordion.Header>
                        <Accordion.Body>
                            <pre>{JSON.stringify(vectorResponses, null, 2)}</pre>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={`${typename} - scalar reads`}>
                        <Accordion.Header>{`${typename} - Scalar reads`}</Accordion.Header>
                        <Accordion.Body>
                            <pre>{JSON.stringify(scalarResponses, null, 2)}</pre>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={`${typename} - inserts`}>
                        <Accordion.Header>{`${typename} - Inserts`}</Accordion.Header>
                        <Accordion.Body>
                            <pre>{JSON.stringify(insertResponses, null, 2)}</pre>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={`${typename} - updates`}>
                        <Accordion.Header>{`${typename} - Updates`}</Accordion.Header>
                        <Accordion.Body>
                            <pre>{JSON.stringify(updateResponses, null, 2)}</pre>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={`${typename} - deletes`}>
                        <Accordion.Header>{`${typename} - Deletes`}</Accordion.Header>
                        <Accordion.Body>
                            <pre>{JSON.stringify(deleteResponses, null, 2)}</pre>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Accordion.Body>
        </Accordion.Item>
        )}
        {/* <Accordion.Item eventKey={`${typename} - vector reads`}>
            <Accordion.Header>{`${typename} - Vector reads`}</Accordion.Header>
            <Accordion.Body>
                <pre>{JSON.stringify(vectorResponses, null, 2)}</pre>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={`${typename} - scalar reads`}>
            <Accordion.Header>{`${typename} - Scalar reads`}</Accordion.Header>
            <Accordion.Body>
                <pre>{JSON.stringify(scalarResponses, null, 2)}</pre>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={`${typename} - inserts`}>
            <Accordion.Header>{`${typename} - Inserts`}</Accordion.Header>
            <Accordion.Body>
                <pre>{JSON.stringify(insertResponses, null, 2)}</pre>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={`${typename} - updates`}>
            <Accordion.Header>{`${typename} - Updates`}</Accordion.Header>
            <Accordion.Body>
                <pre>{JSON.stringify(updateResponses, null, 2)}</pre>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={`${typename} - deletes`}>
            <Accordion.Header>{`${typename} - Deletes`}</Accordion.Header>
            <Accordion.Body>
                <pre>{JSON.stringify(deleteResponses, null, 2)}</pre>
            </Accordion.Body>
        </Accordion.Item> */}
    </>)
}

export const SchemaTests = ({schema}) => {

    const queryTypeName = schema?.queryType?.name;
    // find the full Query type definition in schema.types
    const queryTypeDef = schema?.types.find(t => t.name === queryTypeName) || {};
    const queryFields = queryTypeDef.fields || [];

    // Collect base type names, filter out falsy, then dedupe
    const names = queryFields
        .map(item => unwrapType(item.type).name)
        .filter(Boolean);

    const namesOnce_ = Array.from(new Set(names));    
    // const namesOnce = namesOnce_.slice(0, 1)
    const namesOnce = namesOnce_
    return (<>
        {/* <div>{namesOnce.map(typename => <TypeTests key={typename} schema={schema} typename={typename} />)}</div> */}
        <Accordion>
            {namesOnce.map(typename => <TypeChainTest key={typename} schema={schema} typename={typename} />)}
        </Accordion>
        
    </>)
}