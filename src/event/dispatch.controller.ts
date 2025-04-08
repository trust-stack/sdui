import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FormDto, FormItemType } from './dtos';

@Controller('event/dispatch')
export class DispatchFormRenderController {
    @Get()
    @ApiOperation({
        description: 'Render a dispatch event form',
        operationId: 'renderDispatchForm',
    })
    @ApiOkResponse({
        type: FormDto,
    })
    async render(): Promise<FormDto> {
        return {
            header: {
                title: 'Dispatch Event',
            },
            sections: [
                {
                    validationId: 'whereWhen',
                    title: 'Event Location and Time',
                    items: [
                        {
                            type: FormItemType.SUB_HEADER,
                            subHeader: 'Where was the product dispatched from?',
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            validationId: 'whereWhen.sourceStorage',
                            type: FormItemType.SELECT,
                            select: {
                                label: 'Storage',
                                options: [], // TODO
                            },
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            type: FormItemType.SUB_HEADER,
                            subHeader: 'Where was the product dispatched to?',
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            validationId: 'whereWhen.destinationPartner',
                            type: FormItemType.SELECT,
                            select: {
                                label: 'Trade Partner',
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
                    title: 'What Was Dispatched',
                    items: [
                        {
                            validationId: 'what.tradeItemUri',
                            type: FormItemType.TEXT_INPUT,
                            inputLabel: 'Trade Item ID',
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
    }
}
