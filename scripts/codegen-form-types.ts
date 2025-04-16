import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { z } from 'zod';
import { FormValidationField } from '../src/schema/generated';
import { FormValidationSchema } from '../src/schema-validation';
import { isFormValidationField } from '../src/build-validation';

interface ValidationTypeGenerator {
    generateTypeContent(
        validationData: Record<string, any>,
        typeName: string,
    ): string;
    generateFieldType(field: FormValidationField): string;
}

class TypeGenerator implements ValidationTypeGenerator {
    generateTypeContent(
        validationData: Record<string, any>,
        typeName: string,
    ): string {
        let content = `// Generated from validation schema\n`;
        content += `export interface ${typeName}FormData {\n`;
        content += this.generateFields(validationData);
        content += `}\n`;
        return content;
    }

    private generateFields(
        validationData: Record<string, any>,
        indent = 4,
    ): string {
        let content = '';
        for (const [key, value] of Object.entries(validationData)) {
            const spaces = ' '.repeat(indent);
            if (isFormValidationField(value)) {
                content += `${spaces}${key}${value.required ? '' : '?'}: ${this.generateFieldType(value)};\n`;
            } else {
                content += `${spaces}${key}: {\n`;
                content += this.generateFields(value, indent + 4);
                content += `${spaces}};\n`;
            }
        }
        return content;
    }

    generateFieldType(field: FormValidationField): string {
        switch (field.type) {
            case 'string':
                return 'string';
            case 'number':
                return 'number';
            case 'date':
                return 'Date';
            case 'mixed':
                return this.generateMixedType(field);
            case 'array':
                return this.generateArrayType(field);
            case 'object':
                return this.generateObjectType(field);
            default:
                return 'unknown';
        }
    }

    private generateMixedType(field: FormValidationField): string {
        if (field.oneOf) {
            return field.oneOf
                .map((value) =>
                    typeof value === 'string' ? `'${value}'` : String(value),
                )
                .join(' | ');
        }
        return 'unknown';
    }

    private generateArrayType(field: FormValidationField): string {
        if (!field.of) return 'unknown[]';

        if (isFormValidationField(field.of)) {
            return `${this.generateFieldType(field.of)}[]`;
        }

        const objectTypes = Object.entries(field.of)
            .map(([key, value]) => `${key}: ${this.generateFieldType(value)}`)
            .join(', ');
        return `{${objectTypes}}[]`;
    }

    private generateObjectType(field: FormValidationField): string {
        if (!field.shape) return 'Record<string, unknown>';

        const shapeTypes = Object.entries(field.shape)
            .map(([key, value]) => {
                if (isFormValidationField(value)) {
                    return `${key}${value.required ? '' : '?'}: ${this.generateFieldType(value)}`;
                }
                const nestedTypes = Object.entries(value)
                    .map(
                        ([k, v]) =>
                            `${k}${v.required ? '' : '?'}: ${this.generateFieldType(v)}`,
                    )
                    .join(', ');
                return `${key}: {${nestedTypes}}`;
            })
            .join('; ');
        return `{${shapeTypes}}`;
    }
}

async function findJsonFiles(patterns: string[]): Promise<string[]> {
    return patterns.reduce((acc: string[], pattern) => {
        return acc.concat(glob.sync(pattern));
    }, []);
}

async function processJsonFile(
    jsonFile: string,
    typeGenerator: ValidationTypeGenerator,
) {
    try {
        const jsonContent = await fs.readFile(jsonFile, 'utf8');
        const jsonData = JSON.parse(jsonContent);

        // Validate the parsed JSON against 'FormValidationSchema' type
        try {
            FormValidationSchema.parse(jsonData);
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                console.warn(
                    `Skipping ${jsonFile} - not a valid FormValidation schema:`,
                    validationError.errors
                        .map((e) => `${e.path.join('.')}: ${e.message}`)
                        .join('\n'),
                );
                return;
            }
            throw validationError;
        }

        const basename = path
            .basename(jsonFile)
            .replace('.schema', '')
            .replace('.json', '')
            .toLowerCase();
        const typeName = basename[0].toUpperCase() + basename.slice(1);

        const typeContent = typeGenerator.generateTypeContent(
            jsonData.validation,
            typeName,
        );
        const outputPath = jsonFile.replace('.json', '.gen.ts');
        await fs.writeFile(outputPath, typeContent);

        console.log(`Generated types for ${jsonFile} -> ${outputPath}`);
    } catch (error) {
        console.error(`Error processing ${jsonFile}:`, error);
        throw error;
    }
}

async function generateTypesFromJson(patterns: string[]) {
    try {
        const jsonFiles = await findJsonFiles(patterns);
        const typeGenerator = new TypeGenerator();

        await Promise.all(
            jsonFiles.map((file) => processJsonFile(file, typeGenerator)),
        );
    } catch (error) {
        console.error('Error generating types:', error);
        process.exit(1);
    }
}

export default generateTypesFromJson;
