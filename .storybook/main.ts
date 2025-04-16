import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
        {
            name: '@storybook/addon-react-native-web',
            options: {
                modulesToTranspile: [
                    'expo-linking',
                    'expo-constants',
                    'expo-modules-core',
                    'expo-document-picker',
                    'expo-av',
                    'expo-asset',
                ],
            },
        },
    ],
    core: {
        builder: '@storybook/builder-vite',
    },
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },
    async viteFinal(config) {
        const { mergeConfig } = await import('vite');
        return mergeConfig(config, {
            resolve: {
                alias: {
                    '*.svg': '*.svg?react',
                    'react-native': 'react-native-web',
                },
            },
            optimizeDeps: {
                esbuildOptions: {
                    resolveExtensions: [
                        '.web.js',
                        '.web.jsx',
                        '.web.ts',
                        '.web.tsx',
                        '.mjs',
                        '.js',
                        '.mts',
                        '.ts',
                        '.jsx',
                        '.tsx',
                        '.json',
                    ],
                    loader: {
                        '.js': 'jsx',
                    },
                },
            },
            define: {
                'process.env': {},
            },
            legacy: {
                skipWebSocketTokenCheck: true,
            },
        });
    },
};
export default config;

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}

process.on('SIGINT', function () {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    // some other closing procedures go here
    process.exit(0);
});
