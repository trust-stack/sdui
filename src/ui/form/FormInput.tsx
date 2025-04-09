import { Controller, FieldValues, Path } from 'react-hook-form';
import { TextField, TextFieldProps } from '../TextField';
import { useFormContext } from './context';

export type FormInputProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

// TODO: Implement placeholder component
export function FormInput<TFormFields extends FieldValues>({
    id,
    ...props
}: FormInputProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
                <TextField
                    {...props}
                    value={field?.value}
                    onChange={field?.onChange}
                />
            )}
        />
    );
}
