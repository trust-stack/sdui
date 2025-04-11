import { FieldValues } from 'react-hook-form';
import { usePlatform } from '../PlatformContext';
import { PagerForm as Native } from './PagerForm.native';
import { PagerForm as Web } from './PagerForm.web';
import { PagerFormProps } from './types';

// TODO: Move to @trust-stack/ui-kit?

export function PagerForm<TFieldValues extends FieldValues>({
    ...props
}: PagerFormProps<TFieldValues>) {
    const platform = usePlatform();

    const Component = platform == 'web' ? Web : Native;

    return <Component<TFieldValues> {...props} />;
}
