import { FieldValues, Path } from 'react-hook-form';

export type FormSubmitButtonProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// Placeholder component
export function FormSubmitButton<TFormFields extends FieldValues>({
    ...props
}: FormSubmitButtonProps<TFormFields>) {
    return null;
}
