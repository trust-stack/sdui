import { Controller, FieldValues, Path } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '../DateTimePicker';
import { useFormContext } from './context';

export type FormDateTimePickerProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<DateTimePickerProps, 'value' | 'onChange'>;

// Placeholder component
export function FormDateTimePicker<TFormFields extends FieldValues>({
    id,
    ...props
}: FormDateTimePickerProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
                <DateTimePicker
                    {...props}
                    value={field?.value}
                    onChange={field?.onChange}
                />
            )}
        />
    );
}
