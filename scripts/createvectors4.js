#!/usr/bin/env node

const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  isObjectType,
  isScalarType,
  isNonNullType,
  isListType,
  Kind,
  getNamedType,
} = require('graphql');

/**
 * Zachová velikost písmen při nahrazení textu, chrání specifické výskyty placeholderem.
 */
function preserveCaseReplace(text, target, replacement) {
  const placeholder = "processVVVVVVAttributeFromGraphQLResult";
  text = text.replace(/processVectorAttributeFromGraphQLResult/g, placeholder);

  const regex = new RegExp(target, 'gi');
  text = text.replace(regex, (match) => {
    if (match === match.toUpperCase()) return replacement.toUpperCase();
    if (match === match.toLowerCase()) return replacement.toLowerCase();
    if (match[0] === match[0].toUpperCase() && match.slice(1) === match.slice(1).toLowerCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
    }
    return replacement;
  });

  return text.replace(new RegExp(placeholder, 'g'), "processVectorAttributeFromGraphQLResult");
}

/**
 * Spočítá SHA256 hash obsahu.
 */
function computeChecksum(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * Načte seznam vhodných fieldů k injekci z typu definovaného v SDL AST.
 */
function getInjectableFields(astDoc, typeName) {
  const typeDef = astDoc.definitions.find(
    (d) => (d.kind === Kind.OBJECT_TYPE_DEFINITION || d.kind === Kind.OBJECT_TYPE_EXTENSION) && d.name.value === typeName
  );
  if (!typeDef) return [];

  return typeDef.fields
    .filter((f) => {
      const hasRequiredArgs = f.arguments?.some((arg) =>
        arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null
      );
      if (hasRequiredArgs) return false;
      if (f.type.kind === Kind.LIST_TYPE || (f.type.kind === Kind.NON_NULL_TYPE && f.type.type.kind === Kind.LIST_TYPE))
        return false;
      const base = unwrapType(f.type);
      return base.kind === Kind.NAMED_TYPE;
    })
    .map((f) => f.name.value);
}

/**
 * Vrací jméno typu, který je výsledkem fieldu (např. z LIST[Type!] → Type).
 */
function unwrapType(typeNode) {
  while (typeNode.kind === Kind.NON_NULL_TYPE || typeNode.kind === Kind.LIST_TYPE) {
    typeNode = typeNode.type;
  }
  return typeNode;
}

/**
 * Získá typ definici z AST podle jména.
 */
function getTypeDef(astDoc, name) {
  return astDoc.definitions.find(
    (d) => (d.kind === Kind.OBJECT_TYPE_DEFINITION || d.kind === Kind.OBJECT_TYPE_EXTENSION) && d.name.value === name
  );
}

/**
 * Získá list fieldy z typu podle pravidel.
 */
function getListFields(astDoc, typeName) {
  const type = getTypeDef(astDoc, typeName);
  if (!type) return [];

  return type.fields.filter((field) => {
    const hasRequiredArgs = field.arguments?.some((arg) =>
      arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null
    );
    if (hasRequiredArgs) return false;

    let t = field.type;
    if (t.kind === Kind.NON_NULL_TYPE) t = t.type;
    return t.kind === Kind.LIST_TYPE || (t.kind === Kind.NON_NULL_TYPE && t.type.kind === Kind.LIST_TYPE);
  });
}

/**
 * Zpracuje soubor pro daný vectorName a nahradí query.
 */
async function processFile(sourcePath, destPath, vectorName, injectFields) {
  const raw = await fs.readFile(sourcePath, 'utf8');
  const replaced = preserveCaseReplace(raw, 'Vector', vectorName);
  console.log(`injecting ${JSON.stringify(injectFields)}\n`)
  const pattern = /\{\s*__typename\s*id\s*\}/m;
  const inject = `{\n            __typename\n            ${injectFields.join('\n            ')}\n        }`;
  const final = replaced.replace(pattern, inject);

  const newChecksum = computeChecksum(final);
  const checksumFile = destPath + '.checksum.txt';

  try {
    const prev = await fs.readFile(destPath, 'utf8');
    const prevChecksum = await fs.readFile(checksumFile, 'utf8');
    if (computeChecksum(prev) === prevChecksum.trim()) {
      await fs.writeFile(destPath, final, 'utf8');
      await fs.writeFile(checksumFile, newChecksum, 'utf8');
      console.log(JSON.stringify({ status: "updated", file: destPath }));
      return;
    }
    console.log(JSON.stringify({ status: "skipped", reason: "checksum mismatch", file: destPath }));
  } catch {
    await fs.writeFile(destPath, final, 'utf8');
    await fs.writeFile(checksumFile, newChecksum, 'utf8');
    console.log(JSON.stringify({ status: "created", file: destPath }));
  }
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
 * Hlavní funkce.
 */
const main = async () => {
  try {
    const args = process.argv.slice(2);
    const pname = args[0];
    const cname = args[1];

    if (!pname || !cname) throw new Error("Missing arguments: usage generateVectors4.js <pname> <cname>");

    const base = path.resolve(__dirname, '..', 'packages', pname, 'src', cname);
    const truncatedModelName = cname.replace('GQLModel', '')
    const srcFile = path.join(base, 'Vectors', `${truncatedModelName}VectorsAttribute.jsx`);
    const sdlDocPath = path.resolve(process.cwd(), 'debug-sdl.json');

    const sdlDoc = JSON.parse(fss.readFileSync(sdlDocPath, 'utf8'));
    const typeDefs = sdlDoc.definitions.filter(def => def.kind === 'ObjectTypeDefinition');

    const rootType = typeDefs.find(def => def.name.value === cname);
    if (!rootType) throw new Error(`Type ${cname} not found in SDL`);

    const scalarTypes = new Set([
      'Int', 'Float', 'String', 'Boolean', 'ID',
      ...sdlDoc.definitions
        .filter(def => def.kind === 'ScalarTypeDefinition')
        .map(def => def.name.value)
    ]);


    const defs         = sdlDoc.definitions;
    const typesByName  = {};
    const trivialTypes = new Set('String', 'Int', 'Float', 'Boolean', 'ID',);
  
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

    const results = [];

    for (const field of rootType.fields) {
      const hasRequiredArgs = field.arguments?.some(arg => arg.type.kind === 'NonNullType');
      if (hasRequiredArgs) continue;

      let t = field.type;
      
      if (t.kind === 'NonNullType') t = t.type;
      if (t.kind !== 'ListType') continue;

      let baseType = t.type;
      if (baseType.kind === 'NonNullType') baseType = baseType.type;
      const baseTypeName = baseType.name.value;

      const subDef = typeDefs.find(def => def.name.value === baseTypeName);
      if (!subDef) continue;

      const subFields = subDef.fields.filter(f => {
        const hasRequired = f.arguments?.some(arg => arg.type.kind === 'NonNullType');
        if (hasRequired) return false;
        const result = isTrivialField(f.type)
        console.log(`testing subfield ${field?.name?.value}.${f.name.value} -> ${result}\n`)
        return result
      }).map(f => f.name.value);

      const fieldName = field.name.value;
      const capitalized = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      const vectorName = capitalized.endsWith('s') ? capitalized.slice(0, -1) : capitalized;      
      const dest = path.join(base, 'Vectors', `${truncatedModelName}${vectorName}sAttribute.jsx`);

      console.log(`\ngot subfields ${field?.name?.value}.${JSON.stringify(subFields)}\n`)

      await processFile(srcFile, dest, vectorName, subFields);
      results.push(field.name.value);
    }

    console.log(JSON.stringify({ data: results }));
  } catch (err) {
    console.error(JSON.stringify({ errors: [err.message] }));
    process.exit(1);
  }
};

main();
