import { useState, useEffect, useMemo } from 'react'
/**
 * Rozbalí obaly NON_NULL a LIST a vrátí základní typ
 *
 * @param {Object} type Objekt typu ve tvaru GraphQL introspekce
 * @returns {Object} Základní typ bez wrapperů
 */
export const unwrapType = (type) => {
    let t = type;
    while (t.kind === 'NON_NULL' || t.kind === 'LIST') {
      t = t.ofType;
    }
    return t;
  }

/**
 * Builds a selection set by iterating over fields of the given object type.
 * Includes only fields that have no args or only optional args.
 * For fields returning OBJECT or LIST of OBJECT, nests them with `{ __typename id }`.
 *
 * @param {object} schema — GraphQL introspection schema
 * @param {object} fieldType — GraphQL field type object
 * @returns {string} Selection set string
 */
export const buildSelectionOptional = (schema, fieldType) => {
    const base = unwrapType(fieldType);
    if (base.kind !== 'OBJECT') {
      return '{ __typename }';
    }
  
    const typeDef = schema.types.find(t => t.name === base.name);
    if (!typeDef || !typeDef.fields) {
      console.info(`Type definition ${base.name} failed`);
      return '';
    }
  
    const parts = [];
  
    for (const f of typeDef.fields) {
      const { name, args = [] } = f;
      if (name.startsWith('__')) continue;
      // skip fields with any required (NON_NULL) args
      if (args.length && args.some(arg => arg.type.kind === 'NON_NULL')) continue;
  
      const retBase = unwrapType(f.type);
      if (retBase.kind === 'OBJECT') {
        parts.push(`${name} { __typename id }`);
      } else if (retBase.kind === 'UNION') {
        parts.push(`${name} { __typename }`);
      } else {
        parts.push(name);
      }
    }
  
    if (parts.length === 0) {
      return '';
    }
  
    return `{ ${parts.join('\n  ')} }`;
  };
  
/**
 * Recursively builds a selection set based on the kind of fieldType.
 *
 * @param {object} schema — GraphQL introspection schema
 * @param {object} fieldType — GraphQL field type object
 * @returns {string} Selection set string
 */
export const buildSelection = (schema, fieldType) => {
    if (!fieldType || !fieldType.kind) {
      console.info(`Empty field type: ${fieldType}`);
      return '';
    }
  
    switch (fieldType.kind) {
      case 'SCALAR':
        return '';
      case 'OBJECT':
        return buildSelectionOptional(schema, fieldType);
      case 'LIST':
      case 'NON_NULL':
        return buildSelection(schema, fieldType.ofType);
      case 'UNION':
        return '{ __typename }';
      default:
        return '';
    }
  };
  

/**
 * Prints GraphQL type signature, handling NON_NULL and LIST.
 *
 * @param {{ kind: string, ofType?: object, name?: string }} typeRef
 * @returns {string}
 */
export const printType = (typeRef) => {
    if (!typeRef) {
        return "";
    }
    const { kind } = typeRef;
    if (kind === "NON_NULL") {
        return `${printType(typeRef.ofType)}!`;
    }
    if (kind === "LIST") {
        return `[${printType(typeRef.ofType)}]`;
    }
    // SCALAR or OBJECT etc.
    return typeRef.name || "";
};

/**
 * Builds parameter definitions string for given INPUT_OBJECT type.
 * Outputs GraphQL variable signature, e.g.:
 * (
 *     $field1: Type1!,
 *     $field2: Type2
 * )
 *
 * @param {object} schema — GraphQL introspection schema
 * @param {string} inputTypeName — name of the INPUT_OBJECT type
 * @returns {string}
 */
export const buildInputTypeParams = (schema, inputTypeName) => {
    const inpDef = schema.types.find(
        (t) => t.name === inputTypeName && t.kind === "INPUT_OBJECT"
    );
    if (!inpDef || !inpDef.inputFields) {
        return "";
    }

    const params = inpDef.inputFields.map((field) => {
        const raw = field.type;
        const typeStr =
            raw.kind === "NON_NULL"
                ? `${printType(raw.ofType)}!`
                : printType(raw);
        return `$${field.name}: ${typeStr}`;
    });

    if (params.length === 0) {
        return "";
    }

    const joined = params.join(",\n    ");
    return `(\n    ${joined}\n)`;
};

/**
 * Builds complete GraphQL mutation string for given mutation.
 * Uses expanded individual fields as variables based on input type.
 *
 * @param {object} schema — GraphQL introspection schema
 * @param {string} mutationName — name of the mutation field
 * @returns {string}
 */
export const buildExpandedMutation = (schema, mutationName) => {
    const mType = schema.types.find(
        (t) => t.name === schema.mutationType.name
    );
    if (!mType) {
        return "";
    }

    const field = mType.fields.find((f) => f.name === mutationName);
    if (!field || field.args.length !== 1) {
        return "";
    }

    const arg = field.args[0];
    const inputName = unwrapType(arg.type).name;
    const paramDefs = buildInputTypeParams(schema, inputName);

    // build call args
    const inpDef = schema.types.find((t) => t.name === inputName) || {};
    const inputs = inpDef.inputFields || [];
    const callArgs = inputs
        .map((f) => `${f.name}: $${f.name}`)
        .join(",\n    ");

    // build selection
    const retBase = unwrapType(field.type);
    let selection = "";
    if (retBase.kind === "UNION") {
        const unionDef = schema.types.find((t) => t.name === retBase.name) || {};
        const parts = (unionDef.possibleTypes || [])
            .filter((pt) => pt.kind === "OBJECT")
            .map(
                (pt) =>
                    `... on ${pt.name} ${buildSelection(schema, {
                        kind: "OBJECT",
                        name: pt.name
                    })}`
            );
        const joined = parts.join("\n    ");
        selection = ` {\n    __typename\n    ${joined}\n}`;
    } else if (retBase.kind === "OBJECT") {
        const sel = buildSelection(schema, retBase);
        selection = sel ? ` ${sel}` : "";
    }

    return `mutation ${paramDefs} {\n    ${mutationName}(${arg.name}: {\n        ${callArgs}\n    })${selection}\n}`;
};

/**
 * Builds a readPage query for given type.
 *
 * @param {object} schema — GraphQL introspection schema
 * @param {string} operationName — name of the query field
 * @returns {string}
 */
export const buildQueryPage = (schema, operationName) => {
    const queryTypeName = schema.queryType.name;
    const queryType = schema.types.find((t) => t.name === queryTypeName);
    if (!queryType) {
        throw new Error(`Query type ${queryTypeName} not found in schema`);
    }

    const fieldDef = queryType.fields.find((f) => f.name === operationName);
    if (!fieldDef) {
        throw new Error(`Field ${operationName} not found in schema`);
    }

    // unwrap expected NON_NULL -> LIST -> NON_NULL -> OBJECT
    let fieldResultType = fieldDef.type;
    if (fieldResultType.kind !== "NON_NULL") {
        throw new Error(
            `${operationName} must be NON_NULL list: ${JSON.stringify(
                fieldResultType
            )}`
        );
    }
    fieldResultType = fieldResultType.ofType;
    if (fieldResultType.kind !== "LIST") {
        throw new Error(
            `${operationName} must be a LIST: ${JSON.stringify(
                fieldResultType
            )}`
        );
    }
    const listType = fieldResultType.ofType;
    if (!listType || listType.kind !== "NON_NULL") {
        throw new Error(`List type is not NON_NULL: ${JSON.stringify(listType)}`);
    }
    const typeDef = listType.ofType;
    if (!typeDef || typeDef.kind !== "OBJECT") {
        throw new Error(`List items must be OBJECT: ${JSON.stringify(typeDef)}`);
    }

    const typeDef2 = schema.types.find((t) => t.name === typeDef.name);
    if (!typeDef2) {
        throw new Error(`Type definition ${typeDef.name} not found in schema`);
    }
    const sel = buildSelection(schema, typeDef2);
    return `query ${operationName} {\n    ${operationName}${sel}\n}`;
};

/**
 * Builds a read(id) query for given type.
 *
 * @param {object} schema — GraphQL introspection schema
 * @param {string} operationName — name of the query field
 * @returns {string|null}
 */
export const buildQueryScalar = (schema, operationName) => {
    const queryTypeName = schema.queryType.name;
    const queryType = schema.types.find((t) => t.name === queryTypeName);
    if (!queryType) {
        return null;
    }

    const fieldDef = queryType.fields.find((f) => f.name === operationName);
    if (!fieldDef) {
        return null;
    }

    const fieldResultType = unwrapType(fieldDef.type);
    if (fieldResultType.kind !== "OBJECT") {
        return null;
    }

    const typeDef = schema.types.find((t) => t.name === fieldResultType.name);
    if (!typeDef) {
        return null;
    }

    const sel = buildSelection(schema, typeDef);
    return `query ${operationName}Read($id: UUID!) {\n    ${operationName}(id: $id)${sel}\n}`;
};


/**
 * Returns an array of query field names that take a single NON_NULL `id` arg
 * and return the specified OBJECT type (unwrapping NON_NULL/LIST).
 *
 * @param {object} schema         — GraphQL introspection schema
 * @param {string} targetTypeName — the OBJECT type name to filter by
 * @returns {string[]}            — array of matching query field names
 */
export const getReadScalarValue = (schema, targetTypeName) => {
    const result = [];
    const queryTypeName = schema.queryType?.name;
    const queryType = schema.types.find(t => t.name === queryTypeName);
    if (!queryType) {
        return result;
    }

    for (const field of queryType.fields || []) {
        const args = field.args || [];
        // Must have exactly one argument named "id" which is NON_NULL
        if (
            args.length === 1 &&
            args[0].name === 'id' &&
            args[0].type.kind === 'NON_NULL'
        ) {
            // Unwrap LIST/NON_NULL to get the base return type
            const baseType = unwrapType(field.type);
            // If it's the target OBJECT type, include the field name
            if (baseType.kind === 'OBJECT' && baseType.name === targetTypeName) {
                result.push(field.name);
            }
        }
    }

    return result;
};


/**
 * Returns an array of query field names that return a non-null list of non-null objects
 * of the specified type.
 *
 * @param {object} schema
 * @param {string} targetTypeName
 * @returns {string[]}
 */
export const getReadVectorValue = (schema, targetTypeName) => {
    const result = [];
    const queryTypeName = schema.queryType?.name;
    const queryType = schema.types.find(t => t.name === queryTypeName);
    if (!queryType) {
        return result;
    }

    for (const f of queryType.fields || []) {
        const t = f.type;
        if (
            t.kind === 'NON_NULL' &&
            t.ofType?.kind === 'LIST' &&
            t.ofType.ofType?.kind === 'NON_NULL'
        ) {
            const base = t.ofType.ofType.ofType;
            if (base.kind === 'OBJECT' && base.name === targetTypeName) {
                result.push(f.name);
            }
        }
    }

    return result;
};

/**
 * Returns an array of insert mutation names that take a single non-null INPUT_OBJECT arg
 * (without 'lastchange' field) and return a UNION including the specified type.
 *
 * @param {object} schema
 * @param {string} targetTypeName
 * @returns {string[]}
 */
export const getInsertMutations = (schema, targetTypeName) => {
    const result = [];
    const mutationTypeName = schema.mutationType?.name;
    const mType = schema.types.find(t => t.name === mutationTypeName);
    if (!mType) {
        return result;
    }

    for (const f of mType.fields || []) {
        const args = f.args || [];
        if (
            args.length === 1 &&
            args[0].type.kind === 'NON_NULL'
        ) {
            const argDef = unwrapType(args[0].type);
            if (argDef.kind === 'INPUT_OBJECT') {
                const inpDef = schema.types.find(t => t.name === argDef.name) || {};
                const fieldNames = (inpDef.inputFields || []).map(i => i.name);
                if (!fieldNames.includes('lastchange')) {
                    const retBase = unwrapType(f.type);
                    if (retBase.kind === 'UNION') {
                        const unionDef = schema.types.find(t => t.name === retBase.name) || {};
                        if ((unionDef.possibleTypes || []).some(
                            pt => pt.kind === 'OBJECT' &&
                                  pt.name === targetTypeName &&
                                  !pt.name.includes('Error')
                        )) {
                            result.push(f.name);
                        }
                    }
                }
            }
        }
    }

    return result;
};

/**
 * Returns an array of update mutation names that take a single non-null INPUT_OBJECT arg
 * with required 'id' and 'lastchange' fields, and return a UNION including the specified type.
 *
 * @param {object} schema
 * @param {string} targetTypeName
 * @returns {string[]}
 */
export const getUpdateMutations = (schema, targetTypeName) => {
    const result = [];
    const mutationTypeName = schema.mutationType?.name;
    const mType = schema.types.find(t => t.name === mutationTypeName);
    if (!mType) {
        return result;
    }

    for (const f of mType.fields || []) {
        const args = f.args || [];
        if (
            args.length === 1 &&
            args[0].type.kind === 'NON_NULL'
        ) {
            const argDef = unwrapType(args[0].type);
            if (argDef.kind === 'INPUT_OBJECT') {
                const inpDef = schema.types.find(t => t.name === argDef.name) || {};
                const inputFields = inpDef.inputFields || [];
                if (inputFields.length > 2) {
                    const requiredNames = inputFields
                        .filter(i => i.type.kind === 'NON_NULL')
                        .map(i => i.name);
                    if (requiredNames.includes('id') && requiredNames.includes('lastchange')) {
                        const retBase = unwrapType(f.type);
                        if (retBase.kind === 'UNION') {
                            const unionDef = schema.types.find(t => t.name === retBase.name) || {};
                            if ((unionDef.possibleTypes || []).some(
                                pt => pt.kind === 'OBJECT' &&
                                      pt.name === targetTypeName &&
                                      !pt.name.includes('Error')
                            )) {
                                result.push(f.name);
                            }
                        }
                    }
                }
            }
        }
    }

    return result;
};

/**
 * Returns an array of delete mutation names that take a single non-null INPUT_OBJECT arg
 * whose required fields are exactly 'id' and 'lastchange', and return an OBJECT whose 'Entity'
 * field unwraps to the specified type.
 *
 * @param {object} schema
 * @param {string} targetTypeName
 * @returns {string[]}
 */
export const getDeleteMutations = (schema, targetTypeName) => {
    const result = [];
    const mutationTypeName = schema.mutationType?.name;
    const mType = schema.types.find(t => t.name === mutationTypeName);
    if (!mType) {
        return result;
    }

    for (const f of mType.fields || []) {
        const args = f.args || [];
        if (
            args.length === 1 &&
            args[0].type.kind === 'NON_NULL'
        ) {
            const argDef = unwrapType(args[0].type);
            if (argDef.kind === 'INPUT_OBJECT') {
                const inpDef = schema.types.find(t => t.name === argDef.name) || {};
                const requiredNames = (inpDef.inputFields || [])
                    .filter(i => i.type.kind === 'NON_NULL')
                    .map(i => i.name);
                if (
                    requiredNames.length === 2 &&
                    requiredNames.includes('id') &&
                    requiredNames.includes('lastchange')
                ) {
                    let ret = f.type;
                    if (ret.kind === 'NON_NULL') {
                        ret = ret.ofType;
                    }
                    if (ret.kind === 'OBJECT') {
                        const retDef = schema.types.find(t => t.name === ret.name) || {};
                        const entityField = (retDef.fields || []).find(fl => fl.name === 'Entity');
                        if (entityField) {
                            const entityType = unwrapType(entityField.type).name;
                            if (entityType === targetTypeName) {
                                result.push(f.name);
                            }
                        }
                    }
                }
            }
        }
    }

    return result;
};

export const gqlFetch = async (url, query, variables) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
};

export const URI = "/api/gql"

export const useQueryVectorTest = (schema, operationName, variables) => {
    const vars = useMemo(
        () => variables ?? {},
        // třeba podle JSON.stringify, pokud máte komplexní objekt
        [JSON.stringify(variables)]
      );
    const url = URI;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vectorData, setVectorData] = useState(null);
    
    const query = useMemo(()=>buildQueryPage(schema, operationName), [operationName]);
    useEffect(() => {
        gqlFetch(url, query, vars)
            .then(data => {
                setVectorData(data.data[operationName]);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [operationName, vars]);

    return { loading, error, data: vectorData, query };
}

export const useQueryScalarTest = (schema, operationName, variables) => {
    const url = URI;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scalarData, setScalarData] = useState(null);
    useEffect(() => {
        if (!variables) return;
        const query = buildQueryScalar(schema, operationName);
        gqlFetch(url, query, variables)
            .then(data => {
                setScalarData(data.data[operationName]);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [schema, operationName, variables])    

    return { loading, error, data: scalarData };
}

export const useMutationInsertTest = (schema, operationName, variables) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [insertData, setInsertData] = useState(null);

    useEffect(() => {
        if (!variables) return;
        const query = buildExpandedMutation(schema, operationName);
        // Remove the 'id' field from the variables
        delete variables.id;
        // Remove the 'lastchange' field from the variables
        delete variables.lastchange;
        // Add any other fields you want to include in the insert here

        gqlFetch(URI, query, variables)
            .then(data => {
                setInsertData(data.data[operationName]);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [schema, operationName, variables])

    return { loading, error, data: insertData };
}

export const useMutationUpdateTest = (schema, operationName, variables) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateData, setUpdateData] = useState(null);

    useEffect(() => {
        if (!variables) return;
        const query = buildExpandedMutation(schema, operationName);
        
        gqlFetch(URI, query, variables)
            .then(data => {
                setUpdateData(data.data[operationName]);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [schema, operationName, variables])

    return { loading, error, data: updateData };
}

export const useDeleteTest = (schema, operationName, variables) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteData, setDeleteData] = useState(null);

    useEffect(() => {
        if (!variables) return;
        const query = buildExpandedMutation(schema, operationName);

        gqlFetch(URI, query, variables)
            .then(data => {
                setDeleteData(data.data[operationName]);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [schema, operationName, variables])

    return { loading, error, data: deleteData };
}

