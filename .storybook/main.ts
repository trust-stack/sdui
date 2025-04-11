import { tamaguiPlugin } from '@tamagui/vite-plugin';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.tsx'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    typescript: {
        // Disable docgen which is causing the parsing issue
        reactDocgen: false,
    },
    async viteFinal(config) {
        const { mergeConfig } = await import('vite');
        return mergeConfig(config, {
            resolve: {
                alias: {
                    'react-native$': 'react-native-web',
                },
            },
            plugins: [
                tamaguiPlugin({
                    config: './.storybook/tamagui.config.ts',
                    components: ['tamagui'],
                    importsWhitelist: ['constants.js', 'colors.js'],
                    logTimings: true,
                    disableExtraction: true,
                    platform: 'web',
                }),
            ],
        });
    },
};

export default config;
