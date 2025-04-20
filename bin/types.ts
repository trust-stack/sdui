import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class SDUIConfig {
    @IsArray()
    @IsString({ each: true })
    @Type(() => String)
    schemas: string[];
}
