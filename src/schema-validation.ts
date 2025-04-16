import { z } from 'zod';

const FormValidationFieldSchema = z.object({
    type: z.enum(['string', 'number', 'date', 'mixed', 'array', 'object']),
    required: z.boolean().optional(),
    oneOf: z.array(z.union([z.string(), z.number()])).optional(),
    of: z
        .union([
            z.lazy(() => FormValidationFieldSchema),
            z.record(z.lazy(() => FormValidationFieldSchema)),
        ])
        .optional(),
    shape: z
        .record(
            z.union([
                z.lazy(() => FormValidationFieldSchema),
                z.record(z.lazy(() => FormValidationFieldSchema)),
            ]),
        )
        .optional(),
});

export const FormValidationSchema = z.object({
    validation: z.record(
        z.union([
            FormValidationFieldSchema,
            z.record(FormValidationFieldSchema),
        ]),
    ),
});
