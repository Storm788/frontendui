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
    const named = getNamedType(type);
    return named.kind === 'SCALAR' || named.kind === 'ENUM';
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
        lines.push('    id');
        lines.push('    lastchange');
        if (typeDef.fields.find(f => f.name === 'name')) {
            lines.push('    name');
        }
        if (typeDef.fields.find(f => f.name === 'nameEn')) {
            lines.push('    nameEn');
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
        } else if (match === match.toLowerCase()) {
            return replacement.toLowerCase();
        } else if (
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
 * Copy file from srcPath to destPath, replacing all "Empty" occurrences with newName,
 * checking whether to overwrite based on checksum, and regenerating GraphQL fragments and queries if applicable.
 *
 * @param {string} srcPath - Path to the source template file.
 * @param {string} destPath - Target path where the processed file should be written.
 * @param {string} newName - Entity name used to replace "Empty" throughout the file.
 */
async function copyAndProcessFile(srcPath, destPath, newName) {
    let shouldWrite = true;

    try {
        await fs.access(destPath);

        // Destination exists — compare checksums
        const existingContent = await fs.readFile(destPath, 'utf8');
        const existingChecksum = computeChecksum(existingContent);
        const checksumFilePath = destPath + '.checksum.txt';
        const storedChecksum = (await fs.readFile(checksumFilePath, 'utf8')).trim();

        if (storedChecksum !== existingChecksum) {
            console.warn(`⚠️  File ${destPath} has been changed. Skipping overwrite.`);
            return;
        }
    } catch (err) {
        // File or checksum doesn't exist — proceed to write
    }

    let content = await fs.readFile(srcPath, 'utf8');
    let newContent = preserveCaseReplace(content, "Empty", newName);

    // Special case: fragments file — generate fresh content from schema
    if (path.basename(srcPath) === 'EmptyFragments.jsx') {
        const modelName = `${newName}GQLModel`;
        const link = generateFragment(modelName, typesByName, 'link');
        const medium = generateFragment(modelName, typesByName, 'medium');
        const large = generateFragment(modelName, typesByName, 'large');

        newContent =
            `import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";\n\n` +
            `export const ${newName}LinkFragment = createQueryStrLazy(\`\n${link}\n\`);\n\n` +
            `export const ${newName}MediumFragment = createQueryStrLazy(\`\n${medium}\n\`, ${newName}LinkFragment);\n\n` +
            `export const ${newName}LargeFragment = createQueryStrLazy(\`\n${large}\n\`, ${newName}MediumFragment);\n`;
    }

    // Attempt GraphQL query mutation replacement (if type is recognized)
    const operationType = srcPath.includes('Insert') ? 'insert' :
                          srcPath.includes('Update') ? 'update' :
                          srcPath.includes('Delete') ? 'delete' :
                          srcPath.includes('ReadPage') ? 'page' :
                          srcPath.includes('Read') ? 'byId' : null;

    if (operationType) {
        const gqlName = newName.toLowerCase() + (operationType === 'byId' ? 'ById' : capitalize(operationType));
        const gql = generateQueryOrMutation(
            gqlName,
            typesByName,
            ['insert', 'update', 'delete'].includes(operationType),
            newName
        );

        if (gql) {
            newContent = newContent.replace(
                /createQueryStrLazy\(\s*`[^`]+`\s*(?:,\s*[^\)]+)?\)/s,
                `createQueryStrLazy(\`\n${gql}\n\`, ${newName}LargeFragment)`
            );
        }
    }

    const newChecksum = computeChecksum(newContent);
    const checksumFilePath = destPath + '.checksum.txt';

    if (shouldWrite) {
        await fs.writeFile(destPath, newContent, 'utf8');
        await fs.writeFile(checksumFilePath, newChecksum, 'utf8');
        console.log(`✅ Processed file: ${destPath}`);
    } else {
        console.log(`⏭️ Skipped file: ${destPath}`);
    }
}


/**
 * Recursively copies a directory from srcDir to destDir,
 * replacing "Empty" in file and folder names and processing file content.
 *
 * @param {string} srcDir - Source directory path.
 * @param {string} destDir - Destination directory path.
 * @param {string} newName - Replacement string for "Empty" in names and content.
 */
async function copyDirectory(srcDir, destDir, newName) {
    await fs.mkdir(destDir, { recursive: true });
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
        const srcEntryPath = path.join(srcDir, entry.name);

        // Replace "Empty" in file/directory names
        const newEntryName = preserveCaseReplace(entry.name, "Empty", newName);
        const destEntryPath = path.join(destDir, newEntryName);

        if (entry.isDirectory()) {
            await copyDirectory(srcEntryPath, destEntryPath, newName);
        } else if (entry.isFile()) {
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


(async () => {
    try {
        // Ask the user for the destination directory (relative to 'packages')
        const destRelative = await prompt(
            "Enter the destination directory relative to 'packages' (e.g., 'myFaculty/templates'): "
        );
        if (!destRelative) {
            console.error("No destination provided. Exiting.");
            process.exit(1);
        }

        // Ask the user for the new names to replace "Empty" (comma-separated)
        const newNamesInput = await prompt("Enter the new names to replace 'Empty' (comma-separated): ");
        if (!newNamesInput) {
            console.error("No new names provided. Exiting.");
            process.exit(1);
        }

        // Split and trim into an array of new names
        const newNames = newNamesInput
            .split(',')
            .map(n => n.trim())
            .filter(Boolean);

        if (newNames.length === 0) {
            console.error("No valid new names provided. Exiting.");
            process.exit(1);
        }

        // Define the root destination directory (under packages/{destRelative}/src)
        const destRoot = path.resolve(__dirname, '..', 'packages', destRelative, 'src');

        // Define source directory: in our _empty package the templates are under packages/_empty/src/Empty
        const srcDir = path.resolve(__dirname, '..', 'packages', '_empty', 'src', 'Empty');
        console.log(`Source directory: ${srcDir}`);

        // Process each new name separately
        for (const newName of newNames) {
            const destDir = path.join(destRoot, newName);
            console.log(`\nProcessing new component: ${newName}`);
            console.log(`Destination: ${destDir}`);
            await copyDirectory(srcDir, destDir, newName);
        }

        console.log("\n✅ Copy and replacement completed for all new names.");
    } catch (err) {
        console.error("❌ Error:", err);
    }
})();

