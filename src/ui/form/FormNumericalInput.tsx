import { Controller, FieldValues, Path } from 'react-hook-form';
import { NumericalInput, NumericalInputProps } from '../NumericalInput';
import { useFormContext } from './context';

export type FormNumericalInputProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<NumericalInputProps, 'value' | 'onChange'>;

// TODO: Implement placeholder component
export function FormNumericalInput<TFormFields extends FieldValues>({
    id,
    ...props
}: FormNumericalInputProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
                <NumericalInput
                    {...props}
                    value={field?.value}
                    onChange={field?.onChange}
                />
            )}
        />
    );
}
