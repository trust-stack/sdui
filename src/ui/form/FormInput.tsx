import { FieldValues, Path } from 'react-hook-form';
import { TextField, TextFieldProps } from '../TextField';

export type FormInputProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

// TODO: Implement placeholder component
export function FormInput<TFormFields extends FieldValues>({
    ...props
}: FormInputProps<TFormFields>) {
    return <TextField {...props} />;
}
