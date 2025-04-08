import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FormDto, FormItemType } from './dtos';

@Controller('event/receive')
export class ReceiveFormRenderController {
    @Get()
    @ApiOperation({
        description: 'Render a receive event form',
        operationId: 'renderReceiveForm',
    })
    @ApiOkResponse({
        type: FormDto,
    })
    async render(): Promise<FormDto> {
        return {
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
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            validationId: 'whereWhen.sourcePartner',
                            type: FormItemType.SELECT,
                            select: {
                                label: 'Source Partner',
                                options: [], // TODO
                            },
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            type: FormItemType.SUB_HEADER,
                            subHeader: 'Where was the product stored?',
                            expanded: 12,
                            compact: 12,
                        },
                        {
                            validationId: 'whereWhen.storage',
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
                    title: 'What Was Received',
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
    }
}
