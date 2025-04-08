import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { FormItemDto } from './form-item.dto';

@ApiSchema({ name: 'FormSection' })
export class FormSectionDto {
    @ApiProperty({
        description: 'The validation ID for this form section',
        type: String,
        required: true,
    })
    readonly validationId: string;

    @ApiProperty({
        description: 'The title of the form section',
        type: String,
        required: true,
    })
    readonly title: string;

    @ApiProperty({
        description: 'The form items in this section',
        type: [FormItemDto],
        required: true,
    })
    readonly items: FormItemDto[];
}
