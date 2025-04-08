import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { ToggleDto } from '../../components';
import { FormItemDto } from './form-item.dto';

@ApiSchema({ name: 'FormToggle' })
export class FormToggleDto extends ToggleDto {
    constructor() {
        super();
    }

    @ApiProperty({
        description:
            'Form items to conditionally display based on a toggle option value',
        type: Array,
        required: false,
    })
    readonly conditionalItems?: {
        readonly value: string; // Must match one of the toggle's option values
        readonly items: FormItemDto[];
    }[];
}
