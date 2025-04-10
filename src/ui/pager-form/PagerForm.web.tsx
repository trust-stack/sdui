import { FieldValues } from 'react-hook-form';
import { PagerFormProps } from './types';

// Placeholder component
export function PagerForm<TFieldValues extends FieldValues>({
    ...props
}: PagerFormProps<TFieldValues>) {
    return <></>;
}
