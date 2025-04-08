import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { HeaderDto } from '../../components';
import { FormSectionDto } from './form-section.dto';
import { FormValidation } from './types';

@ApiSchema({ name: 'Form' })
export class FormDto {
    @ApiProperty({
        description: 'The form header configuration',
        type: HeaderDto,
        required: true,
    })
    readonly header: HeaderDto;

    @ApiProperty({
        description: 'The form sections',
        type: [FormSectionDto],
        required: true,
    })
    readonly sections: FormSectionDto[];

    @ApiProperty({
        description: 'The form validation configuration',
        type: Object,
        required: true,
    })
    readonly validation: FormValidation;
}
