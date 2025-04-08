import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'FormValidationItem' })
export class FormValidationItemDto {
    @ApiProperty({
        description: 'The type of validation field',
        enum: ['array', 'date', 'mixed', 'number', 'object', 'string'],
        required: true,
    })
    readonly type: 'array' | 'date' | 'mixed' | 'number' | 'object' | 'string';

    @ApiProperty({
        description: 'Whether the field is required',
        type: Boolean,
        required: false,
    })
    readonly required?: boolean;

    @ApiProperty({
        description: 'The validation error message',
        type: String,
        required: false,
    })
    readonly message?: string;

    @ApiProperty({
        description: 'The minimum value/length',
        type: Number,
        required: false,
    })
    readonly min?: number;

    @ApiProperty({
        description: 'The maximum value/length',
        type: Number,
        required: false,
    })
    readonly max?: number;

    @ApiProperty({
        description: 'Array of allowed values',
        type: Array,
        required: false,
    })
    readonly oneOf?: unknown[];

    @ApiProperty({
        description: 'Conditional validation rules',
        type: Object,
        required: false,
    })
    readonly when?: {
        field: string;
        is: unknown;
        then: FormValidationItemDto;
        otherwise?: FormValidationItemDto;
    };

    @ApiProperty({
        description: 'Custom validation test',
        type: Object,
        required: false,
    })
    readonly test?: {
        name: string;
        test: (value: unknown) => boolean | Promise<boolean>;
        message: string;
    };
}
