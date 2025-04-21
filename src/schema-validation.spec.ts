import { describe, expect, it } from 'vitest';
import { FormValidationSchema } from './schema-validation';

describe('schema-validation', () => {
    describe('FormValidationSchema', () => {
        it('should validate correct form validation schema', () => {
            // Arrange: prepare valid schema data
            const validSchema = {
                validation: {
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
                    },
                    tags: {
                        type: 'array',
                        required: true,
                        of: {
                            type: 'string',
                        },
                    },
                    metadata: {
                        type: 'object',
                        required: true,
                        shape: {
                            createdBy: {
                                type: 'string',
                                required: true,
                            },
                            items: {
                                type: 'array',
                                required: true,
                                of: {
                                    type: 'object',
                                    shape: {
                                        id: {
                                            type: 'number',
                                            required: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            };

            // Assert: valid schema should pass validation
            expect(() => FormValidationSchema.parse(validSchema)).not.toThrow();
        });

        it('should reject invalid form validation schema', () => {
            // Arrange: prepare invalid schema data
            const invalidSchema = {
                validation: {
                    whereWhen: {
                        type: 'invalid-type', // Invalid type
                        required: true,
                        shape: {},
                    },
                },
            };

            // Assert: invalid schema should fail validation
            expect(() => FormValidationSchema.parse(invalidSchema)).toThrow();
        });
    });
});
