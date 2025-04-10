import { Form } from 'src/schema/generated';

export const HarvestForm: Form = {
    header: {
        title: 'Harvest Event',
    },
    sections: [
        {
            validationId: 'whereWhen',
            title: 'Harvest Location and Time',
            items: [
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Harvest Location',
                    expanded: 12,
                    compact: 12,
                },
                {
                    validationId: 'whereWhen.location',
                    type: 'SELECT_SUB_LOCATION',
                    inputLabel: 'Paddock',
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
            title: 'What Was Harvested',
            items: [
                {
                    validationId: 'what.tradeItem',
                    type: 'SELECT_TRADE_ITEM',
                    inputLabel: 'Trade Item',
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
        {
            validationId: 'storageDispatch',
            title: 'Storage or dispatch',
            items: [
                {
                    type: 'SUB_HEADER',
                    subHeader: 'Storing on farm or dispatching?',
                    expanded: 12,
                    compact: 12,
                },
                {
                    validationId: 'storageDispatch.option',
                    type: 'TOGGLE',
                    toggle: {
                        options: [
                            {
                                label: 'Storing on farm',
                                value: 'storing',
                            },
                            {
                                label: 'Dispatching to trade partner',
                                value: 'dispatching',
                            },
                        ],
                        conditionalItems: [
                            {
                                value: 'storing',
                                items: [
                                    {
                                        validationId: 'storageDispatch.storage',
                                        type: 'SELECT_SUB_LOCATION',
                                        inputLabel: 'Storage',
                                        expanded: 12,
                                        compact: 12,
                                    },
                                ],
                            },
                            {
                                value: 'dispatching',
                                items: [
                                    {
                                        validationId: 'storageDispatch.partner',
                                        type: 'SELECT_PARTNER',
                                        inputLabel: 'Trade Partner',
                                        expanded: 12,
                                        compact: 12,
                                    },
                                ],
                            },
                        ],
                    },
                    expanded: 12,
                    compact: 12,
                },
            ],
        },
    ],
    validation: {
        whereWhen: {
            location: {
                type: 'string',
                required: true,
                message: 'Location is required',
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
        storageDispatch: {
            option: {
                type: 'mixed',
                required: true,
                oneOf: ['storing', 'dispatching'],
            },
            storage: {
                type: 'string',
                when: {
                    field: 'option',
                    is: 'storing',
                    then: {
                        type: 'string',
                        required: true,
                        message: 'Storage is required',
                    },
                },
            },
            partner: {
                type: 'string',
                when: {
                    field: 'option',
                    is: 'dispatching',
                    then: {
                        type: 'string',
                        required: true,
                        message: 'Trade partner is required',
                    },
                },
            },
        },
    },
};
