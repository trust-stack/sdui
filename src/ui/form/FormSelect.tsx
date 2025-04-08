import { FieldValues, Path } from 'react-hook-form';

export type FormSelectProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// Placeholder component
export function FormSelect<TFormFields extends FieldValues>({
    ...props
}: FormSelectProps<TFormFields>) {
    return null;
}
