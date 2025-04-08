import { FieldValues, Path } from 'react-hook-form';

export type FormDateTimePickerProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// Placeholder component
export function FormDateTimePicker<TFormFields extends FieldValues>({
    ...props
}: FormDateTimePickerProps<TFormFields>) {
    return <></>;
}
