import { ReactNode, createContext, useContext } from 'react';
import { Platform } from 'react-native';

const PlatformContext = createContext({
    platform: Platform.OS,
});

type PlatformProviderProps = {
    readonly children: ReactNode;
    readonly platform?: 'web' | 'android' | 'ios' | 'windows' | 'macos';
};

// This wrapper exits so that we can "mock" the platform is various tests and storybook.
export function PlatformProvider({
    children,
    platform,
}: PlatformProviderProps) {
    return (
        <PlatformContext.Provider value={{ platform: platform || Platform.OS }}>
            {children}
        </PlatformContext.Provider>
    );
}

export const usePlatform = () => useContext(PlatformContext).platform;
