import { promises as fs } from 'fs';
import * as path from 'path';
import { compile } from 'json-schema-to-typescript';

async function generateJsonSchemaTypes() {
    try {
        // Create directories if they don't exist
        const schemaDir = path.resolve(process.cwd(), 'src/schema');
        const outputDir = path.resolve(process.cwd(), 'src/generated');
        await fs.mkdir(outputDir, { recursive: true });

        // Read all JSON schema files
        const files = await fs.readdir(schemaDir);
        const schemaFiles = files.filter((file) => file.endsWith('.json'));

        // Process each schema file
        for (const schemaFile of schemaFiles) {
            const schemaPath = path.join(schemaDir, schemaFile);
            const schemaContent = await fs.readFile(schemaPath, 'utf8');
            const schema = JSON.parse(schemaContent);

            // Generate TypeScript types
            const typescript = await compile(
                schema,
                schemaFile.replace('.json', ''),
            );

            // Write to output file
            const outputPath = path.join(
                outputDir,
                schemaFile.replace('.json', '.ts'),
            );
            await fs.writeFile(outputPath, typescript);

            console.log(`Generated types for ${schemaFile}`);
        }

        console.log('Successfully generated all TypeScript types');
    } catch (error) {
        console.error('Error generating TypeScript types:', error);
        process.exit(1);
    }
}

generateJsonSchemaTypes();
