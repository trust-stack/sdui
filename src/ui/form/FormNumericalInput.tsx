import { FieldValues, Path } from 'react-hook-form';

export type FormNumericalInputProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// Placeholder component
export function FormNumericalInput<TFormFields extends FieldValues>({
    ...props
}: FormNumericalInputProps<TFormFields>) {
    return <></>;
}
