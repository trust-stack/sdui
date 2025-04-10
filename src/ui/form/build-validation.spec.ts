import { describe, it, expect } from 'vitest';
import * as yup from 'yup';
import { FormValidation } from 'src/schema/generated';
import { buildValidationSchema } from './build-validation';

describe('buildValidationSchema', () => {
    it('should build a valid yup schema from HarvestForm validation', () => {
        // Arrange: build validation schema
        const schema = buildValidationSchema(formValidation);

        // Assert: schema is a yup object schema
        expect(schema).toBeInstanceOf(yup.ObjectSchema);

        // Assert: 'whereWhen' validation
        expect(schema.fields.whereWhen).toBeInstanceOf(yup.ObjectSchema);
        expect(
            (schema.fields.whereWhen as yup.ObjectSchema<any>).fields.location,
        ).toBeInstanceOf(yup.StringSchema);
        expect(
            (schema.fields.whereWhen as yup.ObjectSchema<any>).fields.eventTime,
        ).toBeInstanceOf(yup.DateSchema);

        // Assert: 'what' validation
        expect(schema.fields.what).toBeInstanceOf(yup.ObjectSchema);
        expect(
            (schema.fields.what as yup.ObjectSchema<any>).fields.tradeItem,
        ).toBeInstanceOf(yup.StringSchema);
        expect(
            (schema.fields.what as yup.ObjectSchema<any>).fields.quantity,
        ).toBeInstanceOf(yup.NumberSchema);

        // Assert: 'storageDispatch' validation
        expect(schema.fields.storageDispatch).toBeInstanceOf(yup.ObjectSchema);
        expect(
            (schema.fields.storageDispatch as yup.ObjectSchema<any>).fields
                .option,
        ).toBeInstanceOf(yup.MixedSchema);
        expect(
            (schema.fields.storageDispatch as yup.ObjectSchema<any>).fields
                .storage,
        ).toBeInstanceOf(yup.StringSchema);
        expect(
            (schema.fields.storageDispatch as yup.ObjectSchema<any>).fields
                .partner,
        ).toBeInstanceOf(yup.StringSchema);

        // Assert: 'whereWhen' field requirements
        expect(
            (schema.fields.whereWhen as yup.ObjectSchema<any>).fields.location
                .spec.presence,
        ).toBe('required');
        expect(
            (schema.fields.whereWhen as yup.ObjectSchema<any>).fields.eventTime
                .spec.presence,
        ).toBe('required');

        // Assert: 'what' field requirements
        expect(
            (schema.fields.what as yup.ObjectSchema<any>).fields.tradeItem.spec
                .presence,
        ).toBe('required');
        expect(
            (schema.fields.what as yup.ObjectSchema<any>).fields.quantity.spec
                .presence,
        ).toBe('required');

        // Assert: 'storageDispatch' field requirements
        expect(
            (schema.fields.storageDispatch as yup.ObjectSchema<any>).fields
                .option.spec.presence,
        ).toBe('required');
        expect(
            (schema.fields.storageDispatch as yup.ObjectSchema<any>).fields
                .storage.spec.presence,
        ).toBe('optional');
        expect(
            (schema.fields.storageDispatch as yup.ObjectSchema<any>).fields
                .partner.spec.presence,
        ).toBe('optional');

        // Arrange: prepare valid validation data
        const validData = {
            whereWhen: {
                location: 'paddock-1',
                eventTime: new Date(),
            },
            what: {
                tradeItem: 'item-1',
                quantity: 100,
            },
            storageDispatch: {
                option: 'storing',
                storage: 'storage-1',
            },
        };

        // Arrange: prepare invalid validation data
        const invalidData = {
            whereWhen: {
                location: '',
                eventTime: null,
            },
            what: {
                tradeItem: '',
                quantity: null,
            },
            storageDispatch: {
                option: 'invalid',
            },
        };

        // Assert: valid data should pass validation
        expect(async () => await schema.validate(validData)).not.toThrow();

        // Assert: invalid data should fail validation
        expect(
            async () => await schema.validate(invalidData),
        ).rejects.toThrow();
    });

    it('should meet conditional validation (when)', () => {
        // Arrange: build validation schema
        const schema = buildValidationSchema(formValidation);

        // Arrange: prepare data with 'storageDispatch.option' set to 'storing'
        const storingData = {
            whereWhen: {
                location: 'paddock-1',
                eventTime: new Date(),
            },
            what: {
                tradeItem: 'item-1',
                quantity: 100,
            },
            storageDispatch: {
                option: 'storing',
                storage: 'storage-1',
            },
        };

        // Arrange: prepare invalid 'storing' data (missing required 'storage')
        const invalidStoringData = {
            whereWhen: {
                location: 'paddock-1',
                eventTime: new Date(),
            },
            what: {
                tradeItem: 'item-1',
                quantity: 100,
            },
            storageDispatch: {
                option: 'storing',
            },
        };

        // Assert: valid 'storing' data should pass validation
        expect(async () => await schema.validate(storingData)).not.toThrow();

        // Assert: invalid 'storing' data should fail validation
        expect(
            async () => await schema.validate(invalidStoringData),
        ).rejects.toThrow();

        // Assert: partner field should be optional when storing
        expect(
            (schema.fields.storageDispatch as yup.ObjectSchema<any>).fields
                .partner.spec.presence,
        ).toBe('optional');
    });
});

const formValidation: FormValidation = {
    whereWhen: {
        location: {
            type: 'string',
            required: true,
        },
        eventTime: {
            type: 'date',
            required: true,
        },
    },
    what: {
        tradeItem: {
            type: 'string',
            required: true,
        },
        quantity: {
            type: 'number',
            required: true,
        },
    },
    storageDispatch: {
        option: {
            type: 'mixed',
            required: true,
            oneOf: ['storing', 'dispatching'],
        },
        storage: {
            type: 'string',
            when: {
                field: 'option',
                is: 'storing',
                then: {
                    type: 'string',
                    required: true,
                },
            },
        },
        partner: {
            type: 'string',
            when: {
                field: 'option',
                is: 'dispatching',
                then: {
                    type: 'string',
                    required: true,
                },
            },
        },
    },
};
