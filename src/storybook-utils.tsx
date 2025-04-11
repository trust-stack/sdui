import { PlatformProvider, PlatformProviderProps } from './ui/PlatformContext';

export const PlatformDecorator =
    (platform: PlatformProviderProps['platform']) => (Story) => {
        return (
            <PlatformProvider platform={platform}>
                <Story />
            </PlatformProvider>
        );
    };
