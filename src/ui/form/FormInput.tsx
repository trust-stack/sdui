import { FieldValues, Path } from 'react-hook-form';

export type FormInputProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// Placeholder component
export function FormInput<TFormFields extends FieldValues>({
    ...props
}: FormInputProps<TFormFields>) {
    return <></>;
}
