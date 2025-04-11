import { RadioGroup, useFormContext } from '@truststack/ui-kit';
import { Controller, FieldValues, Path } from 'react-hook-form';

// TODO: Move to @trust-stack/ui-kit?

export type FormToggleProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly options: {
        label: string;
        value: string;
    }[];
};

export function FormToggle<TFormFields extends FieldValues>({
    id,
    options,
}: FormToggleProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
                <RadioGroup
                    value={field.value}
                    onChange={field.onChange}
                    items={options}
                />
            )}
        />
    );
}
