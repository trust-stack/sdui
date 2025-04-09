import { YStack } from 'tamagui';
import { useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormItem, FormToggle } from 'src/schema/generated';
import { FormToggleProps } from './FormToggle';
import { Form } from './Form';
import { useFormContext } from './context';

type FormContentBuilderProps = {
    readonly items: FormItem[];
};

export function FormContentBuilder<TFormFields extends FieldValues>({
    items,
}: FormContentBuilderProps) {
    return (
        <Form.Content>
            <YStack gap={4}>
                {items.map((item, itemIndex) => {
                    const key = `form-item-${itemIndex}`;

                    switch (item.type) {
                        case 'SUB_HEADER':
                            return (
                                <Form.Subheader key={key}>
                                    {item.subHeader}
                                </Form.Subheader>
                            );

                        // TODO: Add select components for these types
                        case 'SELECT_LOCATION':
                        case 'SELECT_PARTNER':
                        case 'SELECT_SUB_LOCATION':
                        case 'SELECT_TRADE_ITEM':
                            return (
                                <Form.Select<TFormFields>
                                    key={key}
                                    label={item.inputLabel}
                                    id={item.validationId}
                                    options={[]}
                                />
                            );

                        case 'INPUT_TEXT':
                            return (
                                <Form.Input<TFormFields>
                                    key={key}
                                    label={item.inputLabel}
                                    id={item.validationId}
                                />
                            );

                        case 'INPUT_NUMERICAL':
                            return (
                                <Form.NumericalInput<TFormFields>
                                    key={key}
                                    label={item.inputLabel}
                                    id={item.validationId}
                                />
                            );

                        case 'DATE_TIME_PICKER':
                            return (
                                <Form.DateTimePicker<TFormFields>
                                    key={key}
                                    label={item.inputLabel}
                                    id={item.validationId}
                                />
                            );

                        case 'TOGGLE':
                            return (
                                <RenderFormToggle<TFormFields>
                                    key={key}
                                    label={item.inputLabel}
                                    id={item.validationId}
                                    formToggle={item.toggle}
                                />
                            );

                        default:
                            return null;
                    }
                })}
            </YStack>
        </Form.Content>
    );
}

type RenderFormToggleProps<TFormFields extends FieldValues> = {
    readonly formToggle: FormToggle;
} & FormToggleProps<TFormFields>;

function RenderFormToggle<TFormFields extends FieldValues>({
    id,
    formToggle,
    ...props
}: RenderFormToggleProps<TFormFields>) {
    const { watch } = useFormContext<TFormFields>();

    const value = watch(id);

    const conditionalItem = useMemo(() => {
        return formToggle.conditionalItems.find((item) => item.value === value);
    }, [formToggle, value]);

    return (
        <YStack gap={4}>
            <Form.Toggle<TFormFields>
                options={formToggle.options}
                id={id}
                {...props}
            />

            {conditionalItem && (
                <FormContentBuilder items={conditionalItem.items} />
            )}
        </YStack>
    );
}
