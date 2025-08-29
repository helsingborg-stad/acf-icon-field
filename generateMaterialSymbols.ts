import { Project, SyntaxKind, TupleTypeNode } from 'ts-morph';
import path from 'path';
import fs from 'fs';

// Path to material-symbols index.d.ts
const materialSymbolsDts = require.resolve('material-symbols/index.d.ts');
console.log(`Resolved material-symbols to: ${materialSymbolsDts}`);

const project = new Project();
const sourceFile = project.addSourceFileAtPath(materialSymbolsDts);

// Find the MaterialSymbols type alias
const typeAlias = sourceFile.getTypeAlias('MaterialSymbols');
if (!typeAlias) {
    throw new Error('MaterialSymbols type alias not found');
}

// Get the type node
const typeNode = typeAlias.getTypeNode();
if (!typeNode) {
    throw new Error('MaterialSymbols has no type node');
}

// Ensure it's a tuple type
if (typeNode.getKind() !== SyntaxKind.TupleType) {
    throw new Error('MaterialSymbols is not a tuple type');
}

// Narrow typeNode to TupleTypeNode
const tupleTypeNode = typeNode as TupleTypeNode;

// Extract string literal elements
const elements = tupleTypeNode.getElements();
const symbolNames = elements
    .filter(el => el.getKind() === SyntaxKind.LiteralType)
    .map(el => {
        const literal = el.getFirstChildIfKindOrThrow(SyntaxKind.StringLiteral);
        return literal.getLiteralText();
    });

// Generate object code with type from material-symbols
const objectName = 'MaterialSymbols';
const objectMembers = symbolNames
    .map(name => `  "${name}": "${name.replaceAll('_', ' ')}"`)
    .join(',\n');

const objectCode = `import type { MaterialSymbol as OriginalMaterialSymbols } from 'material-symbols';\n\n` +
`export const ${objectName}: Record<OriginalMaterialSymbols[number], string> = {\n${objectMembers}\n};\n\n` + `export type MaterialSymbolInterface = keyof typeof ${objectName};\n` +
`export type MaterialSymbolsInterface = typeof ${objectName};\n`;

// Output file
const outputPath = path.resolve(__dirname, 'source/js/materialSymbols.ts');
fs.writeFileSync(outputPath, objectCode);
console.log(`Object generated at ${outputPath}`);
