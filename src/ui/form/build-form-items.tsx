import { YStack } from 'tamagui';
import { FormItem } from 'src/schema/generated';
import { Form } from './Form';

export const buildFormItems = (items: FormItem[]) => {
    return (
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
                            <Form.Select
                                key={key}
                                label={item.inputLabel}
                                id={item.validationId}
                            />
                        );

                    case 'INPUT_TEXT':
                        return (
                            <Form.Input
                                key={key}
                                label={item.inputLabel}
                                id={item.validationId}
                            />
                        );

                    case 'INPUT_NUMERICAL':
                        return (
                            <Form.NumericalInput
                                key={key}
                                label={item.inputLabel}
                                id={item.validationId}
                            />
                        );

                    case 'DATE_TIME_PICKER':
                        return (
                            <Form.DateTimePicker
                                key={key}
                                label={item.inputLabel}
                                id={item.validationId}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </YStack>
    );
};
