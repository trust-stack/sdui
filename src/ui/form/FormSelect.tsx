import { Controller, FieldValues, Path } from 'react-hook-form';
import { Select, SelectProps } from '../Select';
import { useFormContext } from './context';

export type FormSelectProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<SelectProps, 'value' | 'onChange'>;

// Placeholder component
export function FormSelect<TFormFields extends FieldValues>({
    id,
    ...props
}: FormSelectProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
                <Select
                    {...props}
                    value={field?.value}
                    onChange={field?.onChange}
                />
            )}
        />
    );
}
