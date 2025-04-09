import { FieldValues, Path } from 'react-hook-form';
import { Select, SelectProps } from '../Select';

export type FormSelectProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<SelectProps, 'value' | 'onChange'>;

// TODO: Implement placeholder component
export function FormSelect<TFormFields extends FieldValues>({
    ...props
}: FormSelectProps<TFormFields>) {
    return <Select {...props} />;
}
