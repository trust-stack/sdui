import { FieldValues, Path } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '../DateTimePicker';

export type FormDateTimePickerProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<DateTimePickerProps, 'value' | 'onChange'>;

// TODO: Implement placeholder component
export function FormDateTimePicker<TFormFields extends FieldValues>({
    ...props
}: FormDateTimePickerProps<TFormFields>) {
    return <DateTimePicker {...props} />;
}
