import { ApiProperty, ApiSchema } from '@nestjs/swagger';

type COLUMN_WIDTH = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

@ApiSchema({ name: 'GridItem' })
export class GridItemDto {
    @ApiProperty({
        description:
            'The number of grid columns this component takes up in expanded view',
        type: Number,
        default: 12,
    })
    expanded: COLUMN_WIDTH = 12;

    @ApiProperty({
        description:
            'The number of grid columns this component takes up in compact view',
        type: Number,
        default: 12,
    })
    compact: COLUMN_WIDTH = 12;
}
