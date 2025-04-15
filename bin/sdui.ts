#!/usr/bin/env node
import 'reflect-metadata';

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { SDUIConfig } from './types';
import { loadConfig } from './utils';

const CONFIG_FILE = 'sdui.config.json';

const program = new Command();

program.name('sdui').description('Server-Driven UI CLI').version('0.0.1');

program
    .command('gen')
    .description('Generate TypeScript types from JSON schema files')
    .option(
        '-c, --config <path>',
        'Path to the configuration file',
        CONFIG_FILE,
    )
    .action(async (options) => {
        try {
            const config = await loadConfig(options.config);

            // Import and run the codegen script
            const { default: generateTypesFromJson } = await import(
                '../scripts/codegen-form-types'
            );
            await generateTypesFromJson(config.schemas);
        } catch (error) {
            console.error(
                'Error generating schema types:',
                error instanceof Error ? error.message : String(error),
            );
            process.exit(1);
        }
    });

program
    .command('init')
    .description('Initialize a new Server-Driven UI configuration file')
    .option(
        '-d, --directory <path>',
        'Directory to create the config file in',
        './',
    )
    .action((options) => {
        const configDir = path.resolve(process.cwd(), options.directory);
        const configPath = path.join(configDir, CONFIG_FILE);

        try {
            // Check if file already exists
            if (fs.existsSync(configPath)) {
                console.error(
                    `Configuration file already exists at ${configPath}`,
                );
                process.exit(1);
            }

            // Create JSON config template
            const jsonTemplate: SDUIConfig = {
                schemas: ['src/**/*.schema.json'],
            };

            fs.writeFileSync(configPath, JSON.stringify(jsonTemplate, null, 2));

            console.log(
                `Created Server-Driven UI configuration file at ${configPath}`,
            );
        } catch (error) {
            console.error(
                'Error creating configuration file:',
                error instanceof Error ? error.message : String(error),
            );
            process.exit(1);
        }
    });

program.parse(process.argv);
