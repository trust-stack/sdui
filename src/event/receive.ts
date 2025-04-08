import { Form, FormItemType } from './types';

// TODO: Implement API endpoint to return form configuration
export const ReceiveForm: Form = {
    header: {
        title: 'Receive Event',
    },
    sections: [
        {
            validationId: 'whereWhen',
            title: 'Event Location and Time',
            items: [
                {
                    type: FormItemType.SUB_HEADER,
                    subHeader: 'Where was the product received from?',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.sourcePartner',
                    type: FormItemType.SELECT,
                    select: {
                        label: 'Source Partner',
                        options: [], // TODO
                    },
                    expand: 12,
                    compact: 12,
                },
                {
                    type: FormItemType.SUB_HEADER,
                    subHeader: 'Where was the product stored?',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.storage',
                    type: FormItemType.SELECT,
                    select: {
                        label: 'Storage',
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
            title: 'What Was Received',
            items: [
                {
                    validationId: 'what.tradeItem',
                    type: FormItemType.SELECT,
                    select: {
                        label: 'Trade Item',
                        options: [], // TODO
                    },
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
            sourcePartner: {
                type: 'string',
                required: true,
                message: 'Source partner is required',
            },
            storage: {
                type: 'string',
                required: true,
                message: 'Storage is required',
            },
            eventTime: {
                type: 'date',
                required: true,
                message: 'Event time is required',
            },
        },
        what: {
            tradeItem: {
                type: 'string',
                required: true,
                message: 'Trade item is required',
            },
            quantity: {
                type: 'number',
                required: true,
                message: 'Quantity is required',
            },
        },
    },
};
