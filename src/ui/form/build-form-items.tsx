import { YStack } from 'tamagui';
import { FormItemDto, FormItemType } from '../../event/dtos';
import { Form } from './Form';

export const buildFormItems = (items: FormItemDto[]) => {
    return (
        <YStack gap={4}>
            {items.map((item, itemIndex) => {
                const key = `form-item-${itemIndex}`;

                switch (item.type) {
                    case FormItemType.SUB_HEADER:
                        return (
                            <Form.Subheader key={key}>
                                {item.subHeader}
                            </Form.Subheader>
                        );

                    case FormItemType.SELECT:
                        return (
                            <Form.Select
                                key={key}
                                label={item.select.label}
                                id={item.validationId}
                                // TODO: Add options
                            />
                        );

                    case FormItemType.TEXT_INPUT:
                        return (
                            <Form.Input
                                key={key}
                                label={item.inputLabel}
                                id={item.validationId}
                            />
                        );

                    case FormItemType.NUMERICAL_INPUT:
                        return (
                            <Form.NumericalInput
                                key={key}
                                label={item.inputLabel}
                                id={item.validationId}
                            />
                        );

                    case FormItemType.DATE_TIME_PICKER:
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
