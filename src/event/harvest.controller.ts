import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FormDto, FormItemType } from './dtos';

@Controller('event/harvest')
export class HarvestFormRenderController {
    @Get()
    @ApiOperation({
        description: 'Render a harvest event form',
        operationId: 'renderHarvestForm',
    })
    @ApiOkResponse({
        type: FormDto,
    })
    async render(): Promise<FormDto> {
        return {
            header: {
                title: 'Harvest Event',
            },
            sections: [
                {
                    validationId: 'whereWhen',
                    title: 'Harvest Location and Time',
                    items: [
                        {
                            type: FormItemType.SUB_HEADER,
                            subHeader: 'Harvest Location',
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            validationId: 'whereWhen.location',
                            type: FormItemType.SELECT,
                            select: {
                                label: 'Location',
                                options: [], // TODO
                            },
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            type: FormItemType.SUB_HEADER,
                            subHeader: 'Event Time',
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            validationId: 'whereWhen.eventTime',
                            type: FormItemType.DATE_TIME_PICKER,
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
                            type: FormItemType.SELECT,
                            select: {
                                label: 'Trade Item',
                                options: [], // TODO
                            },
                            expanded: 6,
                            compact: 12,
                        },
                        {
                            validationId: 'what.quantity',
                            type: FormItemType.NUMERICAL_INPUT,
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
                            type: FormItemType.SUB_HEADER,
                            subHeader: 'Storing on farm or dispatching?',
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            validationId: 'storageDispatch.option',
                            type: FormItemType.TOGGLE,
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
                                                validationId:
                                                    'storageDispatch.storage',
                                                type: FormItemType.SELECT,
                                                select: {
                                                    label: 'Storage',
                                                    options: [], // TODO
                                                },
                                                expanded: 12,
                                                compact: 12,
                                            },
                                        ],
                                    },
                                    {
                                        value: 'dispatching',
                                        items: [
                                            {
                                                validationId:
                                                    'storageDispatch.partner',
                                                type: FormItemType.SELECT,
                                                select: {
                                                    label: 'Trade Partner',
                                                    options: [], // TODO
                                                },
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
                        oneOf: ['storing', 'dispatching'],
                    },
                    storage: {
                        type: 'string',
                        when: {
                            field: 'storageDispatch.option',
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
                            field: 'storageDispatch.option',
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
    }
}
