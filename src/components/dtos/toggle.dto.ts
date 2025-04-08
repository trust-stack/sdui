import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'ToggleOption' })
export class ToggleOptionDto {
    @ApiProperty({
        description: 'The label of the toggle option',
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

@ApiSchema({ name: 'Toggle' })
export class ToggleDto {
    @ApiProperty({
        description: 'The options of the toggle component',
        type: [ToggleOptionDto],
        required: true,
    })
    options: ToggleOptionDto[];
}
