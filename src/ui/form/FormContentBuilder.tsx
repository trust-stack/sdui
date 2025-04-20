import {
    Title,
    FormDateTimePicker,
    FormInput,
    FormNumericalInput,
    FormSelect,
    FormToggle,
    FormToggleProps,
    Grid,
    YStack,
    useFormContext,
} from '@truststack/ui-kit';
import { ReactNode, useMemo } from 'react';
import { FieldValues, useWatch } from 'react-hook-form';
import { FormItem, FormToggle as FormToggleDto } from 'src/schema/generated';

type FormContentBuilderProps = {
    readonly items: FormItem[];
};

export function FormContentBuilder<TFormFields extends FieldValues>({
    items,
}: FormContentBuilderProps) {
    return (
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
                            return gridItem(<Title>{item.subHeader}</Title>);

                        case 'SELECT':
                            return gridItem(
                                <FormSelect<TFormFields>
                                    id={item.validationId}
                                    label={item.inputLabel}
                                    options={item.select?.options}
                                />,
                            );

                        case 'INPUT_TEXT':
                            return gridItem(
                                <FormInput<TFormFields>
                                    id={item.validationId}
                                    label={item.inputLabel}
                                />,
                            );

                        case 'INPUT_NUMERICAL':
                            return gridItem(
                                <FormNumericalInput<TFormFields>
                                    id={item.validationId}
                                    label={item.inputLabel}
                                />,
                            );

                        case 'DATE_TIME_PICKER':
                            return gridItem(
                                <FormDateTimePicker<TFormFields>
                                    id={item.validationId}
                                    label={item.inputLabel}
                                />,
                            );

                        case 'TOGGLE':
                            return gridItem(
                                <RenderFormToggle<TFormFields>
                                    id={item.validationId}
                                    label={item.inputLabel}
                                    formToggle={item.toggle}
                                />,
                            );

                        default:
                            return null;
                    }
                })}
            </Grid>
        </YStack>
    );
}

type RenderFormToggleProps<TFormFields extends FieldValues> = {
    readonly formToggle: FormToggleDto;
} & Omit<FormToggleProps<TFormFields>, 'options'>;

function RenderFormToggle<TFormFields extends FieldValues>({
    id,
    formToggle,
    ...props
}: RenderFormToggleProps<TFormFields>) {
    const { control } = useFormContext<TFormFields>();

    const [value] = useWatch<TFormFields>({
        control,
        name: [id],
    });

    const conditionalItem = useMemo(() => {
        return formToggle.conditionalItems.find((item) => item.value === value);
    }, [formToggle, value]);

    return (
        <YStack gap={4}>
            <FormToggle<TFormFields>
                id={id}
                options={formToggle.options}
                {...props}
            />

            {conditionalItem && (
                <FormContentBuilder<TFormFields>
                    key={conditionalItem.value}
                    items={conditionalItem.items}
                />
            )}
        </YStack>
    );
}
