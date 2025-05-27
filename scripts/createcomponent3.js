#!/usr/bin/env node
const fs = require('fs').promises;
const fss = require('fs')
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const introspectionPath = path.resolve(process.cwd(), 'introspectionresult.json');
const introspection = JSON.parse(fss.readFileSync(introspectionPath, 'utf8')).data.__schema;

const typesByName = {};
for (const type of introspection.types) {
    if (!type.name.startsWith('__')) {
        typesByName[type.name] = type;
    }
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
        const { modelName, typesByName, shortModelName } = ctx;
        const link    = generateFragment(modelName, typesByName, 'link');
        const medium  = generateFragment(modelName, typesByName, 'medium');
        const large   = generateFragment(modelName, typesByName, 'large');


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
    const { srcPath, shortModelName, modelName, typesByName } = ctx;
    const basename = path.basename(srcPath);

    let operationType = null;
    if (basename.includes('Insert'))    operationType = 'insert';
    if (basename.includes('Update'))    operationType = 'update';
    if (basename.includes('Delete'))    operationType = 'delete';
    if (basename.includes('ReadPage'))  operationType = 'page';
    if (basename.includes('Read'))      operationType = 'byId';

    if (!operationType) return;

    const opName = shortModelName.toLowerCase() +
        (operationType === 'byId'
            ? 'ById'
            : operationType[0].toUpperCase() + operationType.slice(1)
        );

    const isMutation = ['insert', 'update', 'delete'].includes(operationType);
    const gql = generateQueryOrMutation(opName, typesByName, isMutation, modelName);

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

const main = async () => {
    try {
        // Ask the user for the destination directory (relative to 'packages')
        const destRelative = await prompt(
            "Enter the destination directory relative to 'packages' (e.g., 'myFaculty/templates'): "
        );
        if (!destRelative) {
            console.error("No destination provided. Exiting.");
            process.exit(1);
        }

        // Define the root destination directory (under packages/{destRelative}/src)
        const destRoot = path.resolve(__dirname, '..', 'packages', destRelative, 'src');

        const objectTypeNames = new Set(
            introspection.types
              .filter(type => type.kind === 'OBJECT')
              .map(type => type.name)
          );

        const entries = await fs.readdir(destRoot, { withFileTypes: true });
        // vyfiltrujeme jen adresáře a vrátíme jejich názvy
        const modelNames = entries
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name)
            .filter(name => objectTypeNames.has(name));

        // // Ask the user for the new names to replace "Empty" (comma-separated)
        // const newNamesInput = await prompt("Enter the new names to replace 'Empty' (comma-separated): ");
        // if (!newNamesInput) {
        //     console.error("No new names provided. Exiting.");
        //     process.exit(1);
        // }

        // // Split and trim into an array of new names
        // const newNames = newNamesInput
        //     .split(',')
        //     .map(n => n.trim())
        //     .filter(Boolean);

        // if (newNames.length === 0) {
        //     console.error("No valid new names provided. Exiting.");
        //     process.exit(1);
        // }

        // Define source directory: in our _empty package the templates are under packages/_empty/src/Empty
        const srcDir = path.resolve(__dirname, '..', 'packages', '_empty', 'src', 'Template');
        console.log(`Source directory: ${srcDir}`);

        // Process each new name separately
        for (const modelName of modelNames) {
            // const shortModelName = modelName.replace(/GQLModel$/, '');
            const destDir = path.join(destRoot, modelName);
            console.log(`\nProcessing new component: ${modelName}`);
            console.log(`Destination: ${destDir}`);
            await copyDirectory(srcDir, destDir, modelName);
        }

        console.log("\n✅ Copy and replacement completed for all new names.");
    } catch (err) {
        console.error("❌ Error:", err);
    }
}

main();

