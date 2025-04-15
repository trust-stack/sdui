import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class SDUIConfig {
    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @IsString({ each: true })
    @Type(() => String)
    schemas: string[];
}
