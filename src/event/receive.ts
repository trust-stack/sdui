import { Form } from 'src/schema/generated';

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
                    type: 'SUB_HEADER',
                    subHeader: 'Where was the product received from?',
                    expanded: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.sourcePartner',
                    type: 'SELECT',
                    inputLabel: 'Source Partner',
                    select: {
                        options: [],
                    },
                    expanded: 12,
                    compact: 12,
                },
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Where was the product stored?',
                    expanded: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.storage',
                    type: 'SELECT',
                    inputLabel: 'Storage',
                    select: {
                        options: [],
                    },
                    expanded: 12,
                    compact: 12,
                },
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Event Time',
                    expanded: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.eventTime',
                    type: 'DATE_TIME_PICKER',
                    inputLabel: 'Event Time',
                    expanded: 12,
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
                    type: 'SELECT',
                    inputLabel: 'Trade Item',
                    select: {
                        options: [],
                    },
                    expanded: 6,
                    compact: 12,
                },
                {
                    validationId: 'what.quantity',
                    type: 'INPUT_NUMERICAL',
                    inputLabel: 'Quantity',
                    expanded: 6,
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
