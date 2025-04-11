import { useFormContext } from '@truststack/ui-kit';
import { Controller, FieldValues, Path } from 'react-hook-form';

// TODO: Move to @trust-stack/ui-kit?

export type FormDateTimePickerProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// TODO: Implement
export function FormDateTimePicker<TFormFields extends FieldValues>({
    id,
    ...props
}: FormDateTimePickerProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller control={control} name={id} render={({ field }) => <></>} />
    );
}
