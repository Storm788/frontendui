#!/usr/bin/env node

const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Kind } = require('graphql');

function preserveCaseReplace(text, target, replacement) {
  const regex = new RegExp(target, 'gi');
  return text.replace(regex, (match) => {
    if (match === match.toUpperCase()) return replacement.toUpperCase();
    if (match === match.toLowerCase()) return replacement.toLowerCase();
    if (match[0] === match[0].toUpperCase() && match.slice(1) === match.slice(1).toLowerCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
    }
    return replacement;
  });
}

function computeChecksum(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

async function processFile(sourceFilePath, destFilePath, newName) {
  const content = await fs.readFile(sourceFilePath, 'utf8');
  const newContent = preserveCaseReplace(content, "Scalar", newName);
  const oldChecksum = computeChecksum(content);
  const newChecksum = computeChecksum(newContent);
  const checksumFilePath = destFilePath + '.checksum.txt';

  let override = false;
  try {
    await fs.access(destFilePath);
    const storedChecksum = await fs.readFile(checksumFilePath, 'utf8');
    if (storedChecksum.trim() === oldChecksum) {
      override = true;
    }
  } catch {
    override = true; // soubor neexistuje nebo checksum neexistuje – zapisuj
  }

  if (override) {
    await fs.writeFile(destFilePath, newContent, 'utf8');
    await fs.writeFile(checksumFilePath, newChecksum, 'utf8');
    console.log(JSON.stringify({ status: "created_or_updated", file: destFilePath }));
  } else {
    console.log(JSON.stringify({ status: "skipped", file: destFilePath }));
  }
}

function unwrapType(typeNode) {
  while (typeNode.kind === Kind.NON_NULL_TYPE || typeNode.kind === Kind.LIST_TYPE) {
    typeNode = typeNode.type;
  }
  return typeNode;
}

function isTrivial(typeNode, trivialSet) {
  const named = unwrapType(typeNode);
  return trivialSet.has(named.name.value);
}

async function main() {
  try {
    const [pname, cname] = process.argv.slice(2);

    if (!pname || !cname) throw new Error("Missing arguments: usage script <packageName> <componentName>");

    const packageDir = path.resolve(__dirname, '..', 'packages', pname);
    const componentDir = path.resolve(packageDir, 'src', cname);
    const truncatedModelName = cname.replace('GQLModel', '');
    const sourceFilePath = path.join(componentDir, "Scalars", `${truncatedModelName}ScalarAttribute.jsx`);

    const sdlDocPath = path.resolve(process.cwd(), 'debug-sdl.json');
    const sdlDoc = JSON.parse(fss.readFileSync(sdlDocPath, 'utf8'));

    const defs = sdlDoc.definitions;
    const scalarTypes = new Set([
      'Int', 'Float', 'String', 'Boolean', 'ID',
      ...defs.filter(d => d.kind === 'ScalarTypeDefinition').map(d => d.name.value)
    ]);

    const typeDef = defs.find(d => d.kind === 'ObjectTypeDefinition' && d.name.value === cname);
    if (!typeDef) throw new Error(`Type ${cname} not found in SDL.`);

    const scalarFields = typeDef.fields.filter(f => {
      const hasRequiredArgs = f.arguments?.some(arg => arg.type.kind === Kind.NON_NULL_TYPE && !arg.defaultValue);
      if (hasRequiredArgs) return false;

      const typeNode = f.type;
      if (typeNode.kind === Kind.LIST_TYPE || (typeNode.kind === Kind.NON_NULL_TYPE && typeNode.type.kind === Kind.LIST_TYPE)) {
        return false;
      }

      const baseType = unwrapType(typeNode);
      return !scalarTypes.has(baseType.name.value);
    }).map(f => f.name.value);

    if (scalarFields.length === 0) {
      console.log(JSON.stringify({ status: "no_scalars_found", component: cname }));
      return;
    }

    for (const sname of scalarFields) {
      const ScalarName = (sname.charAt(0).toUpperCase() + sname.slice(1))
      const destFileName = `${truncatedModelName}${ScalarName}Attribute.jsx`;
      const destFilePath = path.join(componentDir, "Scalars", destFileName);
      await processFile(sourceFilePath, destFilePath, ScalarName);
    }

    console.log(JSON.stringify({ status: "completed", fields: scalarFields }));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
