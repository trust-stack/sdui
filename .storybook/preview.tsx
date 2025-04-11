import { config, TamaguiProvider, Theme } from '@truststack/ui-kit';
import { Preview } from '@storybook/react';
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
            <TamaguiProvider config={config}>
                <Theme name={'light'}>
                    <Story />
                </Theme>
            </TamaguiProvider>
        ),
    ],
};

export default preview;
