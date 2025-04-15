import { Preview } from '@storybook/react';
import { TamaguiProvider, config } from '@truststack/ui-kit';
import React from 'react';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'default',
            values: [{ name: 'default', value: '#FFF' }],
        },
    },
    decorators: [
        (Story) => (
            <TamaguiProvider config={config} defaultTheme={'light'}>
                <Story />
            </TamaguiProvider>
        ),
    ],
};

export default preview;
