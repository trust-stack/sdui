import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.spec.ts'],
        disableConsoleIntercept: true,
        reporters: [
            'default',
            [
                'junit',
                {
                    outputFile: './reports/junit/unit-results.xml',
                    suiteName: 'Unit Tests',
                },
            ],
        ],
    },
    plugins: [swc.vite() as any],
});
