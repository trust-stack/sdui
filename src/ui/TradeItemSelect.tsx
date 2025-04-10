import { Controller, FieldValues, Path } from 'react-hook-form';
import { Select } from './Select';
import { useFormContext } from './form/context';

export type TradeItemSelectProps<TFormFields extends FieldValues> = {
    readonly id: Path<TFormFields>;
    readonly label: string;
};

// TODO: Implement placeholder component
export function TradeItemSelect<TFormFields extends FieldValues>({
    id,
    ...props
}: TradeItemSelectProps<TFormFields>) {
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
