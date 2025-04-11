import { PagerForm } from 'src/schema/generated';

export const MovementForm: PagerForm = {
    header: {
        title: 'Movement Event',
    },
    sections: [
        {
            validationId: 'whereWhen',
            title: 'Event Location and Time',
            items: [
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Where was the product moved from?',
                    expanded: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.sourceStorage',
                    type: 'SELECT',
                    inputLabel: 'Source Storage',
                    select: {
                        options: [],
                    },
                    expanded: 12,
                    compact: 12,
                },
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Where was the product moved to?',
                    expanded: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.destinationStorage',
                    type: 'SELECT',
                    inputLabel: 'Destination Storage',
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
            title: 'What Was Moved',
            items: [
                {
                    validationId: 'what.tradeItemUri',
                    type: 'INPUT_TEXT',
                    inputLabel: 'Trade Item ID',
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
