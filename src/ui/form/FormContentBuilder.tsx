import { YStack } from 'tamagui';
import { ReactNode, useMemo } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { FormItem, FormToggle } from 'src/schema/generated';
import { Grid } from '../Grid';
import { LocationSelect } from '../LocationSelect';
import { PartnerSelect } from '../PartnerSelect';
import { SubLocationSelect } from '../SubLocationSelect';
import { TradeItemSelect } from '../TradeItemSelect';
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

                            case 'SELECT_LOCATION':
                                return gridItem(
                                    <LocationSelect<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
                                    />,
                                );

                            case 'SELECT_PARTNER':
                                return gridItem(
                                    <PartnerSelect<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
                                    />,
                                );

                            case 'SELECT_SUB_LOCATION':
                                return gridItem(
                                    <SubLocationSelect<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
                                    />,
                                );

                            case 'SELECT_TRADE_ITEM':
                                return gridItem(
                                    <TradeItemSelect<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
                                    />,
                                );

                            case 'INPUT_TEXT':
                                return gridItem(
                                    <Form.Input<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
                                    />,
                                );

                            case 'INPUT_NUMERICAL':
                                return gridItem(
                                    <Form.NumericalInput<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
                                    />,
                                );

                            case 'DATE_TIME_PICKER':
                                return gridItem(
                                    <Form.DateTimePicker<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
                                    />,
                                );

                            case 'TOGGLE':
                                return gridItem(
                                    <RenderFormToggle<TFormFields>
                                        label={item.inputLabel}
                                        id={
                                            item.validationId as Path<TFormFields>
                                        }
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
