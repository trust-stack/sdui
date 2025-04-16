import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { PagerForm, FormValidationField } from '../src/schema/generated';
import { isFormValidationField } from '../src/ui/form/build-validation';

async function generateTypesFromJson(patterns: string[]) {
    try {
        // Find all JSON files matching the patterns
        const jsonFiles = patterns.reduce((acc: string[], pattern) => {
            return acc.concat(glob.sync(pattern));
        }, []);

        for (const jsonFile of jsonFiles) {
            const jsonContent = await fs.readFile(jsonFile, 'utf8');

            // TODO: Validate that the JSON matches PagerForm type
            const jsonData = JSON.parse(jsonContent) as PagerForm;
            const validationData = jsonData.validation;

            // Generate TypeScript type declaration
            const basename = path
                .basename(jsonFile)
                .replace('.schema', '')
                .replace('.json', '')
                .toLowerCase();

            const typeName = basename[0].toUpperCase() + basename.slice(1);

            // Generate interface based on validation structure
            let typeContent = `// Generated from validation schema\n`;
            typeContent += `export interface ${typeName}FormData {\n`;

            // Add fields based on validation structure
            for (const [key, value] of Object.entries(validationData)) {
                if (isFormValidationField(value)) {
                    // Handle direct validation field
                    typeContent += `    ${key}${value.required ? '' : '?'}: ${getTypeFromValidation(value)};\n`;
                } else {
                    // Handle nested object validation
                    typeContent += `    ${key}: {\n`;
                    for (const [nestedKey, nestedValue] of Object.entries(
                        value,
                    )) {
                        typeContent += `        ${nestedKey}${nestedValue.required ? '' : '?'}: ${getTypeFromValidation(nestedValue)};\n`;
                    }
                    typeContent += `    };\n`;
                }
            }

            typeContent += `}\n`;

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

function getTypeFromValidation(field: FormValidationField): string {
    switch (field.type) {
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'date':
            return 'Date';
        case 'mixed':
            // If the field is a mixed type, it can be one of the values in the 'oneOf' array
            if (field.oneOf) {
                return field.oneOf
                    .map((value) =>
                        typeof value === 'string'
                            ? `'${value}'`
                            : String(value),
                    )
                    .join(' | ');
            }
            return 'unknown';
        // TODO: resolve type for array
        case 'array':
            return 'any[]';
        // TODO: resolve type for object
        case 'object':
            return 'Record<string, unknown>';
        default:
            return 'unknown';
    }
}

export default generateTypesFromJson;
