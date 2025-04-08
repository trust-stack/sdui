import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'SelectOption' })
export class SelectOptionDto {
    @ApiProperty({
        description: 'The label of the select option',
        type: String,
        required: true,
    })
    label: string;

    @ApiProperty({
        description: 'The value of the select option',
        type: String,
        required: true,
    })
    value: string;
}

@ApiSchema({ name: 'Select' })
export class SelectDto {
    @ApiProperty({
        description: 'The label of the select component',
        type: String,
        required: true,
    })
    label: string;

    @ApiProperty({
        description: 'The options of the select component',
        type: [SelectOptionDto],
        required: true,
    })
    options: SelectOptionDto[];
}
