import { Form } from 'src/schema/generated';

export const DispatchForm: Form = {
    header: {
        title: 'Dispatch Event',
    },
    sections: [
        {
            validationId: 'whereWhen',
            title: 'Event Location and Time',
            items: [
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Where was the product dispatched from?',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.sourceStorage',
                    type: 'SELECT_SUB_LOCATION',
                    inputLabel: 'Storage',
                    expand: 12,
                    compact: 12,
                },
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Where was the product dispatched to?',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.destinationPartner',
                    type: 'SELECT_PARTNER',
                    inputLabel: 'Trade Partner',
                    expand: 12,
                    compact: 12,
                },
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Event Time',
                    expand: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.eventTime',
                    type: 'DATE_TIME_PICKER',
                    inputLabel: 'Event Time',
                    expand: 12,
                    compact: 12,
                },
            ],
        },
        {
            validationId: 'what',
            title: 'What Was Dispatched',
            items: [
                {
                    validationId: 'what.tradeItemUri',
                    type: 'INPUT_TEXT',
                    inputLabel: 'Trade Item ID',
                    expand: 6,
                    compact: 12,
                },
                {
                    validationId: 'what.quantity',
                    type: 'INPUT_NUMERICAL',
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
            destinationPartner: {
                type: 'string',
                required: true,
                message: 'Destination partner is required',
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
