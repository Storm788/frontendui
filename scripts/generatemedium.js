#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Helper to capitalize the first letter.
 */
function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : str;
}

/**
 * Vrací pole fieldů typu SCALAR nebo ENUM (ignoruje objekty a kolekce).
 */
function getScalarFields(ast, typeName) {
    const type = (ast.definitions || []).find(
        d => d.kind === 'ObjectTypeDefinition' && d.name.value === typeName
    );
    if (!type) throw new Error(`Type ${typeName} not found`);
    // Získáme seznam enum a scalar typů
    const scalarTypes = new Set(['String', 'Int', 'Float', 'Boolean', 'ID']);
    for (const def of ast.definitions) {
        if (def.kind === 'ScalarTypeDefinition' || def.kind === 'EnumTypeDefinition') {
            scalarTypes.add(def.name.value);
        }
    }

    // Filtrujeme pouze SCALAR nebo ENUM fieldy
    return (type.fields || []).filter(f => {
        let t = f.type;
        while (t.kind === 'NonNullType' || t.kind === 'ListType') t = t.type;
        return t.kind === 'NamedType' && scalarTypes.has(t.name.value);
    });
}

/**
 * Vygeneruje React komponent pro medium content entity.
 */
function generateMediumContentComponent(typeName, fields) {
    // Parametr v komponentě (malými písmeny, camelCase)
    const paramName = typeName.charAt(0).toLowerCase() + typeName.slice(1).replace(/GQLModel$/, '');

    // Importy & popis
    return `import { Col, Row } from "react-bootstrap";
/**
 * A component that displays medium-level content for a ${typeName} entity.
 *
 * This component renders each scalar property in a separate row.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.${paramName} - The ${typeName} entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the main data.
 */
export const ${typeName.replace(/GQLModel$/, '')}MediumContent = ({${paramName}, children}) => {
    if (!${paramName}) return null;
    const {
        ${fields.map(f => f.name.value).join(',\n        ')}
    } = ${paramName};
    return (
        <>
${fields.map(f =>
`            <Row>
                <Col>${f.name.value}</Col>
                <Col>{${f.name.value} !== undefined && ${f.name.value} !== null ? ${f.name.value} : ""}</Col>
            </Row>`).join('\n')}
            {children}
        </>
    );
};
`;
}

// -------- Main CLI --------
if (require.main === module) {
    const [,, sdlPath, typeName, outputFile] = process.argv;
    if (!sdlPath || !typeName || !outputFile) {
        console.error("Usage: node generate-medium-content.js <debug-sdl.json> <TypeName> <OutputFile>");
        process.exit(1);
    }
    const ast = JSON.parse(fs.readFileSync(path.resolve(sdlPath), "utf8"));
    const fields = getScalarFields(ast, typeName);
    const componentCode = generateMediumContentComponent(typeName, fields);
    fs.writeFileSync(outputFile, componentCode, "utf8");
    console.log("✅ Component saved to", outputFile);
}
