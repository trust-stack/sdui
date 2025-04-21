import { z } from 'zod';
export declare const FormValidationSchema: z.ZodObject<{
    validation: z.ZodRecord<z.ZodString, z.ZodUnion<[any, z.ZodRecord<z.ZodString, any>]>>;
}, "strip", z.ZodTypeAny, {
    validation?: Record<string, any>;
}, {
    validation?: Record<string, any>;
}>;
//# sourceMappingURL=schema-validation.d.ts.map