import { Module } from '@nestjs/common';
import { EventModule } from './event';

@Module({
    imports: [EventModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
