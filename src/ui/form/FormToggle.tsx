import { Controller, FieldValues, Path } from 'react-hook-form';
import { Toggle, ToggleProps } from '../Toggle';
import { useFormContext } from './context';

export type FormToggleProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<ToggleProps, 'value' | 'onChange'>;

// Placeholder component
export function FormToggle<TFormFields extends FieldValues>({
    id,
    ...props
}: FormToggleProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
                <Toggle
                    {...props}
                    value={field?.value}
                    onChange={field?.onChange}
                />
            )}
        />
    );
}
