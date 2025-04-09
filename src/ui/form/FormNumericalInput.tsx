import { FieldValues, Path } from 'react-hook-form';
import { NumericalInput, NumericalInputProps } from '../NumericalInput';

export type FormNumericalInputProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<NumericalInputProps, 'value' | 'onChange'>;

// TODO: Implement placeholder component
export function FormNumericalInput<TFormFields extends FieldValues>({
    ...props
}: FormNumericalInputProps<TFormFields>) {
    return <NumericalInput {...props} />;
}
