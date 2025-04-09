import { FieldValues, Path } from 'react-hook-form';
import { Toggle, ToggleProps } from '../Toggle';

export type FormToggleProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
} & Omit<ToggleProps, 'value' | 'onChange'>;

// TODO: Implement placeholder component
export function FormToggle<TFormFields extends FieldValues>({
    ...props
}: FormToggleProps<TFormFields>) {
    return <Toggle {...props} />;
}
