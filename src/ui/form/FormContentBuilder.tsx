import { YStack } from 'tamagui';
import { ReactNode, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormItem, FormToggle } from 'src/schema/generated';
import { Grid } from '../Grid';
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
                <Grid>
                    {items.map((item, itemIndex) => {
                        const key = `form-item-${itemIndex}`;

                        const gridItem = (children: ReactNode) => (
                            <Grid.Item
                                key={key}
                                exp={item.expanded}
                                compact={item.compact}
                            >
                                {children}
                            </Grid.Item>
                        );

                        switch (item.type) {
                            case 'SUB_HEADER':
                                return gridItem(
                                    <Form.Subheader>
                                        {item.subHeader}
                                    </Form.Subheader>,
                                );

                            // TODO: Add select components for these types
                            case 'SELECT_LOCATION':
                            case 'SELECT_PARTNER':
                            case 'SELECT_SUB_LOCATION':
                            case 'SELECT_TRADE_ITEM':
                                return gridItem(
                                    <Form.Select<TFormFields>
                                        label={item.inputLabel}
                                        id={item.validationId}
                                        options={[]}
                                    />,
                                );

                            case 'INPUT_TEXT':
                                return gridItem(
                                    <Form.Input<TFormFields>
                                        label={item.inputLabel}
                                        id={item.validationId}
                                    />,
                                );

                            case 'INPUT_NUMERICAL':
                                return gridItem(
                                    <Form.NumericalInput<TFormFields>
                                        label={item.inputLabel}
                                        id={item.validationId}
                                    />,
                                );

                            case 'DATE_TIME_PICKER':
                                return gridItem(
                                    <Form.DateTimePicker<TFormFields>
                                        label={item.inputLabel}
                                        id={item.validationId}
                                    />,
                                );

                            case 'TOGGLE':
                                return gridItem(
                                    <RenderFormToggle<TFormFields>
                                        label={item.inputLabel}
                                        id={item.validationId}
                                        formToggle={item.toggle}
                                    />,
                                );

                            default:
                                return null;
                        }
                    })}
                </Grid>
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
