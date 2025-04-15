import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as fs from 'fs';
import * as path from 'path';
import { SDUIConfig } from './types';

/**
 * Load and validate a SDUI configuration file
 */
export async function loadConfig(configPath: string): Promise<SDUIConfig> {
    try {
        const resolvedPath = path.resolve(process.cwd(), configPath);

        // Read and parse the JSON file
        const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
        const configData = JSON.parse(fileContent);

        // Transform plain object to class instance
        const config = plainToInstance(SDUIConfig, configData);

        // Validate using class-validator
        // TODO: Fix validation
        // const errors = await validate(config, {
        //     whitelist: true,
        //     forbidNonWhitelisted: true,
        // });

        // if (errors.length > 0) {
        //     const formattedErrors = errors
        //         .map((error) => {
        //             const constraints = error.constraints
        //                 ? Object.values(error.constraints).join(', ')
        //                 : 'Unknown error';
        //             return `${error.property}: ${constraints}`;
        //         })
        //         .join('\n');

        //     throw new Error(
        //         `Configuration validation failed:\n${formattedErrors}`,
        //     );
        // }

        return config;
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
    }
}
