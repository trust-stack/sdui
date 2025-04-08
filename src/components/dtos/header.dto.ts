import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Header' })
export class HeaderDto {
    @ApiProperty({
        description: 'The title of the header',
        required: true,
    })
    title: string;

    @ApiProperty({
        description: 'The subtitle of the header',
        required: false,
    })
    subtitle?: string;

    @ApiProperty({
        description: 'The size of the header',
        enum: ['small', 'medium', 'large'],
        default: 'small',
    })
    size?: 'small' | 'medium' | 'large' = 'small';
}
