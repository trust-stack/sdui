import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { GridItemDto, SelectDto } from '../../components';
import { FormToggleDto } from './form-toggle.dto';
import { FormItemType } from './types';

@ApiSchema({ name: 'FormItem' })
export class FormItemDto extends GridItemDto {
    constructor() {
        super();
    }

    @ApiProperty({
        description: 'The component type of form item',
        enum: FormItemType,
        required: true,
    })
    readonly type: FormItemType;

    @ApiProperty({
        description: 'The validation ID for this form item',
        type: String,
        required: false,
    })
    readonly validationId?: string;

    @ApiProperty({
        description: 'Sub-header text',
        type: String,
        required: false,
    })
    readonly subHeader?: string;

    @ApiProperty({
        description: 'Input label for form item',
        type: String,
        required: false,
    })
    readonly inputLabel?: string;

    @ApiProperty({
        description: 'Select component configuration',
        type: SelectDto,
        required: false,
    })
    readonly select?: SelectDto;

    @ApiProperty({
        description: 'Toggle component configuration',
        type: FormToggleDto,
        required: false,
    })
    readonly toggle?: FormToggleDto;
}
