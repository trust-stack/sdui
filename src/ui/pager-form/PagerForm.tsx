import { FieldValues } from 'react-hook-form';
import { usePlatform } from '../PlatformContext';
import { PagerForm as Native } from './PagerForm.native';
import { PagerForm as Web } from './PagerForm.web';
import { PagerFormProps } from './types';

export function PagerForm<TFieldValues extends FieldValues>({
    ...props
}: PagerFormProps<TFieldValues>) {
    const platform = usePlatform();

    const Component = platform == 'web' ? Web : Native;

    return <Component<TFieldValues> {...props} />;
}
