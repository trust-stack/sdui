import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { PagerForm } from '../src/schema/generated';

// TODO: Update implementation to generate only validation type
async function generateTypesFromJson(patterns: string[]) {
    try {
        // Find all JSON files matching the patterns
        const jsonFiles = patterns.reduce((acc: string[], pattern) => {
            return acc.concat(glob.sync(pattern));
        }, []);

        for (const jsonFile of jsonFiles) {
            const jsonContent = await fs.readFile(jsonFile, 'utf8');
            const jsonData = JSON.parse(jsonContent);

            // Validate that the JSON matches PagerForm type
            const _typedData: PagerForm = jsonData;

            // Generate TypeScript type declaration
            const typeName = path.basename(jsonFile).replace('.json', '');
            const typeContent = `import { PagerForm } from '@truststack/sdui';

// This file is auto-generated. Do not edit directly.
export type ${typeName}Type = ${JSON.stringify(jsonData, null, 2)} & PagerForm;

// Const assertion to ensure the JSON matches the type
export const ${typeName}Json = ${JSON.stringify(jsonData, null, 2)} as const;`;

            // Write to .gen.ts file in same directory
            const outputPath = jsonFile.replace('.json', '.gen.ts');
            await fs.writeFile(outputPath, typeContent);

            console.log(`Generated types for ${jsonFile} -> ${outputPath}`);
        }
    } catch (error) {
        console.error('Error generating types:', error);
        process.exit(1);
    }
}

export default generateTypesFromJson;
