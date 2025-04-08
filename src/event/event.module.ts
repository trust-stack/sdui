import { Module } from '@nestjs/common';
import { DispatchFormRenderController } from './dispatch.controller';
import { HarvestFormRenderController } from './harvest.controller';
import { MovementFormRenderController } from './movement.controller';
import { ReceiveFormRenderController } from './receive.controller';

@Module({
    controllers: [
        DispatchFormRenderController,
        HarvestFormRenderController,
        MovementFormRenderController,
        ReceiveFormRenderController,
    ],
    providers: [],
    exports: [],
})
export class EventModule {}
