import { Form, FormItemType } from './types';

// TODO: Implement API endpoint to return form configuration
export const MovementForm: Form = {
    header: {
        title: 'Movement Event',
    },
    sections: [
        {
            validationId: 'whereWhen',
            title: 'Event Location and Time',
            items: [
                {
                    type: FormItemType.SUB_HEADER,
                    subHeader: 'Where was the product moved from?',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.sourceStorage',
                    type: FormItemType.SELECT,
                    select: {
                        label: 'Source Storage',
                        options: [], // TODO
                    },
                    expand: 12,
                    compact: 12,
                },
                {
                    type: FormItemType.SUB_HEADER,
                    subHeader: 'Where was the product moved to?',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.destinationStorage',
                    type: FormItemType.SELECT,
                    select: {
                        label: 'Destination Storage',
                        options: [], // TODO
                    },
                    expand: 12,
                    compact: 12,
                },
                {
                    type: FormItemType.SUB_HEADER,
                    subHeader: 'Event Time',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.eventTime',
                    type: FormItemType.DATE_TIME_PICKER,
                    inputLabel: 'Event Time',
                    expand: 12,
                    compact: 12,
                },
            ],
        },
        {
            validationId: 'what',
            title: 'What Was Moved',
            items: [
                {
                    validationId: 'what.tradeItemUri',
                    type: FormItemType.TEXT_INPUT,
                    inputLabel: 'Trade Item ID',
                    expand: 6,
                    compact: 12,
                },
                {
                    validationId: 'what.quantity',
                    type: FormItemType.NUMERICAL_INPUT,
                    inputLabel: 'Quantity',
                    expand: 6,
                    compact: 12,
                },
            ],
        },
    ],
    validation: {
        whereWhen: {
            sourceStorage: {
                type: 'string',
                required: true,
                message: 'Source storage is required',
            },
            destinationStorage: {
                type: 'string',
                required: true,
                message: 'Destination storage is required',
            },
            eventTime: {
                type: 'date',
                required: true,
                message: 'Event time is required',
            },
        },
        what: {
            tradeItemUri: {
                type: 'string',
                required: true,
                message: 'Trade item ID is required',
            },
            quantity: {
                type: 'number',
                required: true,
                message: 'Quantity is required',
            },
        },
    },
};
