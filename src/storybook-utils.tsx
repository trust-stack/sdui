import { PlatformProvider } from '@truststack/ui-kit';

// Storybook decorator for setting the platform context
export const PlatformDecorator = (platform: 'web' | 'ios') => (Story) => {
    return (
        <PlatformProvider platform={platform}>
            <Story />
        </PlatformProvider>
    );
};
