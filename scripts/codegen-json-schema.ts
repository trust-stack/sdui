import { promises as fs } from 'fs';
import * as path from 'path';
import { compile } from 'json-schema-to-typescript';

async function generateJsonSchemaTypes() {
    try {
        // Create directories if they don't exist
        const schemaDir = path.join(__dirname, '../src/schema');
        const outputDir = path.join(__dirname, '../src/schema/generated');
        await fs.mkdir(outputDir, { recursive: true });

        // Read all JSON schema files
        const files = await fs.readdir(schemaDir);

        // Root schema files start with '@' to indicate they are entry points
        // Referenced schemas (without '@') are only included when referenced by a root schema
        // This prevents duplicate type definitions while ensuring all needed types are generated
        const schemaFiles = files.filter(
            (file) => file.startsWith('@') && file.endsWith('.json'),
        );

        // Accumulate all type definitions
        let combinedTypes = '';

        // Process each schema file
        for (const schemaFile of schemaFiles) {
            const schemaPath = path.join(schemaDir, schemaFile);

            const schemaContent = await fs.readFile(schemaPath, 'utf8');
            const schema = JSON.parse(schemaContent);

            // Generate TypeScript types
            const typescript = await compile(
                schema,
                schemaFile.replace('@', '').replace('.json', ''),
                {
                    bannerComment: '',
                    cwd: schemaDir,
                    style: {
                        singleQuote: true,
                        tabWidth: 4,
                    },
                },
            );

            // Add export statement and append to combined types
            combinedTypes += `${typescript}\n\n`;

            console.log(`Generated types for ${schemaFile}`);
        }

        // Write all types to a single file
        const outputPath = path.join(outputDir, 'index.ts');
        await fs.writeFile(outputPath, combinedTypes.trim());

        console.log(
            'Successfully generated TypeScript types in schema/generated/index.ts',
        );
    } catch (error) {
        console.error('Error generating TypeScript types:', error);
        process.exit(1);
    }
}

generateJsonSchemaTypes();
