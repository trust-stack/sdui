import { Controller, FieldValues, Path } from 'react-hook-form';
import { Select } from './Select';
import { useFormContext } from './form/context';

export type SubLocationSelectProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// TODO: Implement placeholder component
export function SubLocationSelect<TFormFields extends FieldValues>({
    id,
    ...props
}: SubLocationSelectProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    return (
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
                <Select
                    {...props}
                    value={field?.value}
                    onChange={field?.onChange}
                    options={[]}
                />
            )}
        />
    );
}
