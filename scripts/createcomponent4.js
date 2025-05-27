#!/usr/bin/env node
const fs = require('fs').promises;
const fss = require('fs')
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const introspectionPath = path.resolve(process.cwd(), 'introspectionresult.json');

const introspection = JSON.parse(fss.readFileSync(introspectionPath, 'utf8')).data.__schema;

const typesByName = {};
const sdlDocPath = path.resolve(process.cwd(), 'debug-sdl.json');
const sdlJson = JSON.parse(fss.readFileSync(sdlDocPath, 'utf8'))
for (const type of introspection.types) {
    if (!type.name.startsWith('__')) {
        typesByName[type.name] = type;
    }
}

/**
 * Replaces all occurrences of a target string within the input text with a replacement string,
 * while preserving the case style of each match.
 *
 * Case preservation is based on the format of the matched word:
 * - If the match is all UPPERCASE → replacement is uppercased
 * - If the match is all lowercase → replacement is lowercased
 * - If the match is Capitalized (first upper, rest lower) → replacement is capitalized
 * - If the match is mixed case or other → replacement is used as-is
 *
 * @param {string} text - The original text in which to perform replacements.
 * @param {string} target - The target word or phrase to be replaced (case-insensitive).
 * @param {string} replacement - The word or phrase to replace with.
 * @returns {string} The modified string with replacements applied and case preserved.
 *
 * @example
 * preserveCaseReplace("Empty is EMPTY or empty.", "empty", "admission");
 * // → "Admission is ADMISSION or admission."
 */
function preserveCaseReplace(text, target, replacement) {
    const regex = new RegExp(target, 'gi');
    return text.replace(regex, (match) => {
        if (match === match.toUpperCase()) {
            return replacement.toUpperCase();
        } 
        if (match === match.toLowerCase()) {
            return replacement.toLowerCase();
        } 
        if (match === target) {
            return replacement; // exact match, no case change
        }
        if (
            match[0] === match[0].toUpperCase() &&
            match.slice(1) === match.slice(1).toLowerCase()
        ) {
            return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
        } else {
            return replacement;
        }
    });
}

/**
 * Capitalizes the first character of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

/**
 * Vrátí poslední (nejvnitřnější) typ z `ofType` řetězce.
 * Např. NON_NULL → LIST → OBJECT → {name} → vrací OBJECT.
 *
 * @param {object} type - GraphQL typová struktura (introspection).
 * @returns {object} Nejvnitřnější typ.
 */
function getNamedType(type) {
    while (type.ofType) {
        type = type.ofType;
    }
    return type;
}

/**
 * Vrátí první typ se `kind === 'LIST'`, pokud nějaký je.
 *
 * @param {object} type - GraphQL typová struktura.
 * @returns {object|null} První LIST typ, nebo null.
 */
function unwrapList(type) {
    while (type.ofType) {
        if (type.kind === 'LIST') return type;
        type = type.ofType;
    }
    return null;
}

/**
 * Checks if a field is of a trivial GraphQL type (SCALAR or ENUM).
 * This excludes OBJECT, LIST, UNION, INTERFACE.
 *
 * @param {object} type - GraphQL type reference.
 * @returns {boolean} True if field is SCALAR or ENUM.
 */
function isTrivialField(type) {
    console.log("isTrivialField", type.kind, type.name);
    // const named = getNamedType(type);
    // return named.kind === 'SCALAR' || named.kind === 'ENUM';
    if (type.kind === 'NON_NULL') {
        return isTrivialField(type.ofType);
    }
    return type.kind === 'SCALAR' || type.kind === 'ENUM';
}

/**
 * Zda je pole "scalar-like":
 * - cílový typ je OBJECT (např. User)
 * - ale NENÍ zabalen do LIST (např. není [User])
 *
 * @param {object} type - GraphQL typ.
 * @returns {boolean}
 */
function isScalarField(type) {
    return getNamedType(type).kind === 'OBJECT' && !unwrapList(type);
}

/**
 * Zda je pole seznam objektů (např. [User])
 *
 * @param {object} type - GraphQL typ.
 * @returns {boolean}
 */
function isListOfObjects(type) {
    const listType = unwrapList(type);
    return listType && getNamedType(type).kind === 'OBJECT';
}


/**
 * Generates a GraphQL fragment for a given type and detail level.
 *
 * @param {string} typeName - The name of the GraphQL type (e.g., 'UserGQLModel').
 * @param {Object.<string, object>} typesByName - Map of GraphQL types by name from introspection.
 * @param {'link' | 'medium' | 'large'} [kind='link'] - The kind of fragment to generate.
 * @returns {string|null} The GraphQL fragment string or null if type not found.
 */
function generateFragment(typeName, typesByName, kind = 'link') {
    const typeDef = typesByName[typeName];
    if (!typeDef || !typeDef.fields) {
        return null;
    }

    const fragmentShortName = `${typeName.replace(/GQLModel$/, '')}`
    const lines = [`fragment ${fragmentShortName}${capitalize(kind)}Fragment on ${typeName} {`];

    if (kind === 'link') {
        lines.push('    __typename');
        for (const field of typeDef.fields) {
            if (isTrivialField(field.type)) {
                lines.push(`    ${field.name}`);
            }
        }
    }

    if (kind === 'medium') {
        lines.push(`    ...${fragmentShortName}LinkFragment`);
        for (const field of typeDef.fields) {
            if (isScalarField(field.type)) {
                const nestedType = getNamedType(field.type);
                const nestedDef = typesByName[nestedType.name];
    
                if (!nestedDef || !Array.isArray(nestedDef.fields)) continue;
    
                const subfields = nestedDef.fields
                    .filter(f => isTrivialField(f.type))
                    .map(f => `        ${f.name}`);
    
                if (subfields.length > 0) {
                    lines.push(`    ${field.name} {`);
                    lines.push('        __typename');
                    
                    lines.push(...subfields);
                    lines.push('    }');
                }
            }
        }
    }

    if (kind === 'large') {
        lines.push(`    ...${fragmentShortName}MediumFragment`);
        for (const field of typeDef.fields) {
            if (isListOfObjects(field.type)) {
                const nestedType = getNamedType(field.type);
                const nestedDef = typesByName[nestedType.name];
    
                if (!nestedDef || !Array.isArray(nestedDef.fields)) continue;
    
                const subfields = nestedDef.fields
                    .filter(f => isTrivialField(f.type))
                    .map(f => `        ${f.name}`);
    
                if (subfields.length > 0) {
                    lines.push(`    ${field.name} {`);
                    lines.push('        __typename');
                    
                    lines.push(...subfields);
                    lines.push('    }');
                }
            }
        }
    }

    lines.push('}');
    return lines.join('\n');
}

/**
 * Generate a GraphQL fragment for a given type from a parsed SDL AST.
 *
 * @param {string} typeName    Name of the GraphQL type (e.g. 'UserGQLModel').
 * @param {object} ast         Parsed SDL AST (as in debug‑sdl.json).
 * @param {'link'|'medium'|'large'} [kind='link']
 * @returns {string|null}      The fragment string, or null if the type isn't found.
 */
function generateFragment(typeName, ast, kind = 'link') {
    // 1) Build lookup of all type defs
    const defs         = ast.definitions;
    const typesByName  = {};
    const trivialTypes = new Set(['String', 'Int', 'Float', 'Boolean', 'ID',]);
  
    for (const def of defs) {
      if (
        def.kind === 'ObjectTypeDefinition' ||
        def.kind === 'InterfaceTypeDefinition'
      ) {
        typesByName[def.name.value] = def;
      }
      // Collect all SCALAR and ENUM names as "trivial"
      if (def.kind === 'ScalarTypeDefinition' || def.kind === 'EnumTypeDefinition') {
        trivialTypes.add(def.name.value);
      }
    }
  
    const typeDef = typesByName[typeName];
    if (!typeDef || !Array.isArray(typeDef.fields)) return null;
  
    // 2) Unwrapping helpers
    function isTrivialField(typeNode) {
      // unwrap NON_NULL
      if (typeNode.kind === 'NonNullType') {
        return isTrivialField(typeNode.type);
      }
      // lists are not trivial
      if (typeNode.kind === 'ListType') {
        return false;
      }
      // NamedType: check if its name is in our trivial set
      return trivialTypes.has(typeNode.name.value);
    }
  
    function isMediumField(typeNode) {
      // unwrap NON_NULL
      if (typeNode.kind === 'NonNullType') {
        return isMediumField(typeNode.type);
      }
      // skip lists
      if (typeNode.kind === 'ListType') {
        return false;
      }
      // NamedType pointing to another object/interface
      return Boolean(typesByName[typeNode.name.value]);
    }
  
    function isLargeField(typeNode) {
      // unwrap NON_NULL
      if (typeNode.kind === 'NonNullType') {
        return isLargeField(typeNode.type);
      }
      // only true for top‑level ListType of objects
      if (typeNode.kind === 'ListType') {
        const inner = typeNode.type;
        // inner may be NonNullType or NamedType
        const nameNode =
          inner.kind === 'NonNullType'
            ? inner.type.name.value
            : inner.name.value;
        return Boolean(typesByName[nameNode]);
      }
      return false;
    }
  
    // 3) Build the fragment
    const shortName = typeName.replace(/GQLModel$/, '');
    const capitalize = s => s[0].toUpperCase() + s.slice(1);
    const fragName = `${shortName}${capitalize(kind)}Fragment`;
  
    const lines = [`fragment ${fragName} on ${typeName} {`];
  
    // link: __typename + all trivial fields
    if (kind === 'link') {
      lines.push('  __typename');
      for (const f of typeDef.fields) {
        if (f.arguments && f.arguments.length > 0) continue;        
        if (isTrivialField(f.type)) {
          lines.push(`  ${f.name.value}`);
        }
      }
    }
  
    // medium: spread link + single‑object fields
    if (kind === 'medium') {
      lines.push(`  ...${shortName}LinkFragment`);
      for (const f of typeDef.fields) {
        if (f.arguments && f.arguments.length > 0) continue;        
        if (isMediumField(f.type)) {
          const nested = typesByName[
            f.type.kind === 'NonNullType' ? f.type.type.name.value : f.type.name.value
          ];
          const subfields = nested.fields
            .filter(sf => isTrivialField(sf.type))
            .map(sf => `    ${sf.name.value}`);
          if (subfields.length) {
            lines.push(`  ${f.name.value} {`);
            lines.push('    __typename');
            lines.push(...subfields);
            lines.push('  }');
          }
        }
      }
    }
  
    // large: spread medium + list‑of‑object fields
    if (kind === 'large') {
      lines.push(`  ...${shortName}MediumFragment`);
      for (const f of typeDef.fields) {
        if (f.arguments && f.arguments.length > 0) continue;        
        if (isLargeField(f.type)) {
          // unwrap to get the NamedType name
          let inner = f.type;
          while (inner.kind === 'NonNullType') inner = inner.type;
          // now inner.kind === 'ListType'
          let ofType = inner.type;
          if (ofType.kind === 'NonNullType') ofType = ofType.type;
          const nested = typesByName[ofType.name.value];
  
          const subfields = nested.fields
            .filter(sf => isTrivialField(sf.type))
            .map(sf => `    ${sf.name.value}`);
          if (subfields.length) {
            lines.push(`  ${f.name.value} {`);
            lines.push('    __typename');
            lines.push(...subfields);
            lines.push('  }');
          }
        }
      }
    }
  
    lines.push('}');
    return lines.join('\n');
  }
  
/**
 * Generates a GraphQL query or mutation string based on the introspection schema.
 *
 * @param {string} operationName - The name of the GraphQL operation (e.g., 'userInsert').
 * @param {Object.<string, object>} typesByName - Map of GraphQL types by name.
 * @param {boolean} [isMutation=false] - Whether to generate a mutation (true) or query (false).
 * @param {string} resultType - The name of the expected result type (used for fragment reference).
 * @returns {string|null} The generated GraphQL operation string, or null if not found.
 */
function generateQueryOrMutation(operationName, typesByName, isMutation = false, resultType) {
    const rootType = isMutation ? introspection.mutationType.name : introspection.queryType.name;
    const typeDef = typesByName[rootType];
    const field = typeDef.fields.find(f => f.name === operationName);

    if (!field) return null;

    let varDefs = [];
    let callArgs = [];

    const args = field.args || [];

    // Check if mutation has one argument of type INPUT_OBJECT → expand its fields
    if (isMutation && args.length === 1) {
        const inputArg = args[0];
        const inputType = getNamedType(inputArg.type);
        const inputDef = typesByName[inputType.name];

        if (inputDef && inputDef.kind === 'INPUT_OBJECT' && Array.isArray(inputDef.inputFields)) {
            for (const inputField of inputDef.inputFields) {
                const inputFieldType = getNamedType(inputField.type);
                const nonNull = inputField.type.kind === 'NON_NULL' ? '!' : '';
                varDefs.push(`$${inputField.name}: ${inputFieldType.name}${nonNull}`);
                callArgs.push(`${inputField.name}: $${inputField.name}`);
            }
        } else {
            // fallback – not INPUT_OBJECT or not found
            const named = getNamedType(inputArg.type);
            const nonNull = inputArg.type.kind === 'NON_NULL' ? '!' : '';
            varDefs.push(`$${inputArg.name}: ${named.name}${nonNull}`);
            callArgs.push(`${inputArg.name}: $${inputArg.name}`);
        }
    } else {
        // Standard case – use arguments as-is
        for (const arg of args) {
            const named = getNamedType(arg.type);
            const nonNull = arg.type.kind === 'NON_NULL' ? '!' : '';
            varDefs.push(`$${arg.name}: ${named.name}${nonNull}`);
            callArgs.push(`${arg.name}: $${arg.name}`);
        }
    }

    const fragmentRef = `...${capitalize(resultType)}LargeFragment`;

    return `${isMutation ? 'mutation' : 'query'} ${capitalize(operationName)}(${varDefs.join(', ')}) {
    result: ${operationName}(${callArgs.join(', ')}) {
        ${field.type.kind === 'UNION' || field.type.kind === 'INTERFACE' ? '__typename\n        ' : ''}${fragmentRef}
    }
}`;
}

/**
 * Generates a GraphQL query or mutation string from a parsed SDL AST,
 * with full Union support—including inline expansion of any Union member
 * whose name includes "Error".
 *
 * @param {string} operationName
 *   The name of the field under Query or Mutation, e.g. "userInsert".
 * @param {object} ast
 *   Your parsed SDL AST (e.g. the contents of debug‑sdl.json).
 * @param {boolean} [isMutation=false]
 *   If true, looks under the "Mutation" type; otherwise "Query".
 * @param {string} resultType
 *   The base type name for the expected result, used for fragment naming.
 * @returns {string|null}
 *   A GraphQL operation string, or null if `operationName` wasn’t found.
 */
function generateQueryOrMutation(operationName, ast, isMutation = false, resultType) {
    // 1) Build a name→definition lookup for *all* kinds of defs
    const defsByName = {};
    for (const def of ast.definitions) {
      if (def.name?.value) {
        defsByName[def.name.value] = def;
      }
    }
  
    // 2) Grab the root type ("Query" or "Mutation")
    const rootName = isMutation ? 'Mutation' : 'Query';
    const rootDef  = defsByName[rootName];
    if (!rootDef || rootDef.kind !== 'ObjectTypeDefinition') return null;
  
    // 3) Find our field under that root
    const fieldDef = (rootDef.fields || [])
      .find(f => f.name.value === operationName);
    if (!fieldDef) return null;
  
    // 4) Helpers to unwrap & re‑stringify TypeNodes
    function getNamedTypeName(node) {
      if (node.kind === 'NonNullType' || node.kind === 'ListType') {
        return getNamedTypeName(node.type);
      }
      return node.name.value;
    }
    function typeNodeToString(node) {
      if (node.kind === 'NonNullType') {
        return `${typeNodeToString(node.type)}!`;
      }
      if (node.kind === 'ListType') {
        return `[${typeNodeToString(node.type)}]`;
      }
      return node.name.value; // NamedType
    }
  
    // 5) Build variable definitions + call‑site args
    const varDefs  = [];
    const callArgs = [];
    const args     = fieldDef.arguments || [];
  
    if (isMutation && args.length === 1) {
        const inputArg = args[0];
        const inputTypeName = getNamedTypeName(inputArg.type);
        const inputDef = defsByName[inputTypeName];
        if (inputDef && inputDef.kind === 'InputObjectTypeDefinition') {
            const inputFields = inputDef.fields || [];
            for (const inputField of inputFields) {
                const name = inputField.name.value;
                varDefs.push(`$${name}: ${typeNodeToString(inputField.type)}`);
            }
            const argName = inputArg.name.value;
            callArgs.push(
                `${argName}: { ${inputFields.map(f => `${f.name.value}: $${f.name.value}`).join(', ')} }`
            );
        } else {
            const name = inputArg.name.value;
            varDefs.push(`$${name}: ${typeNodeToString(inputArg.type)}`);
            callArgs.push(`${name}: $${name}`);
        }
    } else {
        for (const arg of args) {
            const name = arg.name.value;
            varDefs.push(`$${name}: ${typeNodeToString(arg.type)}`);
            callArgs.push(`${name}: $${name}`);
        }
    }
  
    // 6) Inspect the return type
    const returnBase = getNamedTypeName(fieldDef.type);
    const returnDef  = defsByName[returnBase];
  
    // 7) Build the operation string
    const cap     = s => s[0].toUpperCase() + s.slice(1);
    const opName  = cap(operationName);
    const fragRef = `...${cap(resultType.replace(/GQLModel$/, ''))}LargeFragment`;
  
    const lines = [];
    // header
    if (varDefs.length > 0) {
      lines.push(
        `${isMutation ? 'mutation' : 'query'} ${opName}(${varDefs.join(', ')}) {`
      );
    } else {
      lines.push(`${isMutation ? 'mutation' : 'query'} ${opName} {`);
    }
  
    // body start
    const argsSection = callArgs.length ? `(${callArgs.join(', ')})` : '';
    lines.push(`  result: ${operationName}${argsSection} {`);
  
    // handle Union return
    if (returnDef && returnDef.kind === 'UnionTypeDefinition') {
      // always include __typename on union
      lines.push(`    __typename`);
      for (const member of returnDef.types || []) {
        const memberName = member.name.value;
        // inline any Error* types
        if (memberName.includes('Error')) {
          const errDef = defsByName[memberName];
          if (errDef && Array.isArray(errDef.fields)) {
            lines.push(`    ... on ${memberName} {`);
            for (const f of errDef.fields) {

              if (f.arguments && f.arguments.length > 0) {
                // pokud má argumenty, vynech (nebo případně generuj jen volitelné, ale to není zvykem)
                continue;
              }              
              // Zjisti, jestli f.type je OBJECT
              let namedType = f.type;
              while (namedType.kind === 'NonNullType' || namedType.kind === 'ListType') {
                namedType = namedType.type;
              }
              // Pokud je OBJECT (a má jméno např. "UserGQLModel"), vlož fragment
              if (namedType.kind === 'NamedType') {
                const typeName = namedType.name.value;
                const nestedDef = defsByName[typeName];
                if (nestedDef && nestedDef.kind === 'ObjectTypeDefinition') {
                  // Pro ENTITY pole
                  const shortName = typeName.replace(/GQLModel$/, '');
                  lines.push(`      ${f.name.value} {`);
                  lines.push(`        ...${shortName.charAt(0).toUpperCase() + shortName.slice(1)}LargeFragment`);
                  lines.push(`      }`);
                  continue;
                }
              }
              // Jinak jen název pole
              lines.push(`      ${f.name.value}`);
            }
            lines.push(`    }`);
          }
        } else {
          // normal fragment spread
          const memberShort = memberName.replace(/GQLModel$/, '');
          const memberFrag  = `...${memberShort.charAt(0).toUpperCase() + memberShort.slice(1)}LargeFragment`;
          lines.push(`    ... on ${memberName} {`);
          lines.push(`      ${memberFrag}`);
          lines.push(`    }`);
        }
      }
  
    // handle Interface return
    } else if (returnDef && returnDef.kind === 'InterfaceTypeDefinition') {
      lines.push(`    __typename`);
      lines.push(`    ${fragRef}`);
  
    // normal object or scalar
    } else {
      lines.push(`    ${fragRef}`);
    }
  
    // close body & operation
    lines.push(`  }`);
    lines.push(`}`);
  
    return lines.join('\n');
  }
  
  


// Helper: compute SHA256 checksum of given text
function computeChecksum(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}


/**
 * Basic placeholder replacement middleware: replaces all "Empty" with shortModelName in content
 */
async function replaceTemplateMiddleware(ctx) {
    ctx.newContent = preserveCaseReplace(ctx.content, 'Template', ctx.shortModelName);
}

/**
 * Basic placeholder replacement middleware: replaces all "Vector" with shortModelName in content
 */
async function replaceVectorMiddleware(ctx) {
    ctx.newContent = preserveCaseReplace(ctx.content, 'Vector', ctx.attributeName);
}

/**
 * Basic placeholder replacement middleware: replaces all "Scalar" with shortModelName in content
 */
async function replaceScalarMiddleware(ctx) {
    ctx.newContent = preserveCaseReplace(ctx.content, 'Scalar', ctx.attributeName);
}

/**
 * Fragments generator middleware: detects fragment templates and re-generates them
 */
async function fragmentsMiddleware(ctx) {
    if (path.basename(ctx.srcPath) === 'TemplateFragments.jsx') {
        const { modelName, sdlJson, shortModelName } = ctx;
        const link    = generateFragment(modelName, sdlJson, 'link');
        const medium  = generateFragment(modelName, sdlJson, 'medium');
        const large   = generateFragment(modelName, sdlJson, 'large');


        ctx.newContent =
            `import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";\n\n` +
            `export const ${shortModelName}LinkFragment = createQueryStrLazy(\`\n${link}\n\`);\n\n` +
            `export const ${shortModelName}MediumFragment = createQueryStrLazy(\`\n${medium}\n\`, ${shortModelName}LinkFragment);\n\n` +
            `export const ${shortModelName}LargeFragment = createQueryStrLazy(\`\n${large}\n\`, ${shortModelName}MediumFragment);\n`;
    }
}

/**
 * GraphQL operation middleware: replaces query/mutation in template if applicable
 */
async function operationsMiddleware(ctx) {
    const { srcPath, shortModelName, modelName, typesByName, sdlJson } = ctx;
    const basename = path.basename(srcPath);

    let operationType = null;
    if (basename.includes('Insert'))    operationType = 'insert';
    if (basename.includes('Update'))    operationType = 'update';
    if (basename.includes('Delete'))    operationType = 'delete';
    if (basename.includes('Read'))      operationType = 'byId';
    if (basename.includes('ReadPage'))  operationType = 'page';

    if (!operationType) return;

    const opName = shortModelName.toLowerCase() +
        (operationType === 'byId'
            ? 'ById'
            : operationType[0].toUpperCase() + operationType.slice(1)
        );

    const isMutation = ['insert', 'update', 'delete'].includes(operationType);
    const gql = generateQueryOrMutation(opName, sdlJson, isMutation, modelName);

    if (gql) {
        
        ctx.newContent = ctx.newContent.replace(
            /createQueryStrLazy\(\s*`[^`]+`\s*(?:,\s*[^\)]+)?\)/s,
            `createQueryStrLazy(\`\n${gql}\n\`, ${shortModelName}LargeFragment)`
        );
    }
}

// Default middleware chain
const defaultMiddlewares = [
    replaceTemplateMiddleware,
    fragmentsMiddleware,
    operationsMiddleware,
];

/**
 * Copy file from srcPath to destPath, apply middleware transformations,
 * check checksum, and write result if allowed.
 *
 * @param {string} srcPath      - Source template file
 * @param {string} destPath     - Target output file
 * @param {string} newName      - Replacement name for "Empty"
 * @param {Middleware[]} middlewares - Array of processing steps
 */
async function copyAndProcessFile(
    srcPath,
    destPath,
    newName,
    middlewares = defaultMiddlewares
) {
    const modelName       = newName;
    const shortModelName  = modelName.replace(/GQLModel$/, '');
    let shouldWrite       = true;

    // Check existing file and checksum
    try {
        await fs.access(destPath);
        const existingContent = await fs.readFile(destPath, 'utf8');
        const existingChecksum = computeChecksum(existingContent);
        const checksumPath = destPath + '.checksum.txt';
        const storedChecksum = (await fs.readFile(checksumPath, 'utf8')).trim();

        if (storedChecksum !== existingChecksum) {
            console.warn(`⚠️  File ${destPath} has been changed. Skipping overwrite.`);
            return;
        }
    } catch {
        // Missing file or checksum — proceed
    }

    // Read and initialize context
    const originalContent = await fs.readFile(srcPath, 'utf8');
    /** @type {ProcessingContext} */
    const ctx = {
        srcPath,
        destPath,
        newName,
        modelName,
        shortModelName,
        typesByName,            // assume imported or in scope
        sdlJson,            // assume imported or in scope
        content: originalContent,
        newContent: originalContent,
        shouldWrite,
    };

    // Run middlewares sequentially
    for (const mw of middlewares) {
        await mw(ctx);
    }

    // Final write and checksum
    const finalContent = ctx.newContent;
    const newChecksum = computeChecksum(finalContent);
    await fs.writeFile(destPath, finalContent, 'utf8');
    await fs.writeFile(destPath + '.checksum.txt', newChecksum, 'utf8');

    console.log(`✅ Processed file: ${destPath}`);
}


/**
 * Recursively copies a directory from srcDir to destDir,
 * replacing "Template" in file and folder names and processing file content.
 *
 * @param {string} srcDir - Source directory path.
 * @param {string} destDir - Destination directory path.
 * @param {string} newName - Replacement string for "Template" in names and content.
 */
async function copyDirectory(srcDir, destDir, newName) {
    await fs.mkdir(destDir, { recursive: true });
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
        const srcEntryPath = path.join(srcDir, entry.name);

        // Replace "Template" in file/directory names

        if (entry.isDirectory()) {
            const newEntryName = preserveCaseReplace(entry.name, "Template", newName);
            const destEntryPath = path.join(destDir, newEntryName);
            await copyDirectory(srcEntryPath, destEntryPath, newName);
        } else if (entry.isFile()) {
            const shortModelName = newName.replace(/GQLModel$/, '');
            const newEntryName = preserveCaseReplace(entry.name, "Template", shortModelName);
            const destEntryPath = path.join(destDir, newEntryName);
        
            await copyAndProcessFile(srcEntryPath, destEntryPath, newName);
        }
    }
}


/**
 * Prompts the user with a question in the terminal and returns the trimmed response.
 *
 * @param {string} question - The prompt message shown to the user.
 * @returns {Promise<string>} A promise resolving to the user's input (trimmed).
 */
async function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function main() {
    // ────────────────────────────────────────────────────────
    // 1) Read & validate CLI args
    // ────────────────────────────────────────────────────────
    const [,, destRelative, ...modelNamesArg] = process.argv;
    if (!destRelative || modelNamesArg.length === 0) {
      console.error(`
  Usage: ${path.basename(process.argv[1])} <destRelative> <modelName> [modelName2 ...]
  
    <destRelative>    Directory under "packages/" to copy into,
                      e.g. "myFaculty/templates"
    <modelName...>    One or more GraphQL OBJECT type names to process
  `);
      process.exit(1);
    }
   
    // 3) Build set of valid OBJECT type names from AST
    const validTypes = new Set(
      (sdlJson.definitions || [])
        .filter(def =>
          def.kind === 'ObjectTypeDefinition' ||
          def.kind === 'InterfaceTypeDefinition'
        )
        .map(def => def.name.value)
    );
  
    // ────────────────────────────────────────────────────────
    // 4) Compute the root paths
    // ────────────────────────────────────────────────────────
    const destRoot = path.resolve(
      __dirname, '..', 'packages', destRelative, 'src'
    );
    const srcDir = path.resolve(
      __dirname, '..', 'packages', '_empty', 'src', 'Template'
    );
    console.log(`Source directory:      ${srcDir}`);
    console.log(`Destination directory: ${destRoot}\n`);
  
    // ────────────────────────────────────────────────────────
    // 5) Filter & warn about invalid model names
    // ────────────────────────────────────────────────────────
    const modelNames = [];
    const invalid = [];
    for (const name of modelNamesArg) {
      if (validTypes.has(name)) {
        modelNames.push(name);
      } else {
        invalid.push(name);
      }
    }
    if (invalid.length) {
      console.warn(
        '⚠️  These model names are not found in your SDL and will be skipped:',
        invalid.join(', ')
      );
    }
    if (modelNames.length === 0) {
      console.error('❌ No valid model names to process. Exiting.');
      process.exit(1);
    }
  
    // ────────────────────────────────────────────────────────
    // 6) Copy the template into each specified model folder
    // ────────────────────────────────────────────────────────
    for (const modelName of modelNames) {
      const destDir = path.join(destRoot, modelName);
      console.log(`→ Processing: ${modelName}`);
      console.log(`  Copying template into: ${destDir}`);
      try {
        await copyDirectory(srcDir, destDir, modelName);
        console.log('  ✔ Success');
      } catch (err) {
        console.error(`  ❌ Failed on ${modelName}:`, err.message);
      }
    }
  
    console.log('\n✅ All done.');
  }
  
main().catch(err => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
});