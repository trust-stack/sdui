import { TextField, TextFieldProps } from './TextField';

export type NumericalInputProps = TextFieldProps;

// Placeholder component
export function NumericalInput({ onChange, ...props }: NumericalInputProps) {
    return (
        <TextField
            {...props}
            // keyboardType="decimal-pad"
            onChange={(e) => {
                const newValue = e
                    ?.replace(/[^0-9.]/g, '')
                    .replace(/(\..*)\./g, '$1');
                onChange?.(newValue);
            }}
        />
    );
}
