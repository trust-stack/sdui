import { FormValidation, FormValidationField } from 'src/schema/generated';
import * as yup from 'yup';

const buildNestedSchema = (
    validationObject: Record<string, FormValidationField>,
    isOptional = false,
): Record<string, yup.AnySchema> => {
    const schema: Record<string, yup.AnySchema> = {};
    for (const [key, value] of Object.entries(validationObject)) {
        schema[key] = buildValidationField(value, isOptional);
    }
    return schema;
};

const buildArrayValidation = (
    field: FormValidationField,
    isOptional = false,
): yup.ArraySchema<yup.AnySchema> => {
    let validator = yup.array() as yup.ArraySchema<yup.AnySchema>;

    if (field.of) {
        if (isFormValidationField(field.of)) {
            validator = validator.of(
                buildValidationField(field.of, isOptional),
            );
        } else {
            validator = validator.of(
                yup.object().shape(buildNestedSchema(field.of, isOptional)),
            );
        }
    }

    return validator;
};

const buildObjectValidation = (
    field: FormValidationField,
    isOptional = false,
): yup.ObjectSchema<any> => {
    let validator = yup.object();

    if (field.shape) {
        const nestedSchema: Record<string, yup.AnySchema> = {};
        for (const [key, value] of Object.entries(field.shape)) {
            if (isFormValidationField(value)) {
                nestedSchema[key] = buildValidationField(value, isOptional);
            } else {
                nestedSchema[key] = yup
                    .object()
                    .shape(buildNestedSchema(value, isOptional));
            }
        }
        validator = validator.shape(nestedSchema);
    }

    return validator;
};

const applyMinMaxValidation = (
    validator: yup.AnySchema,
    field: FormValidationField,
    type: 'min' | 'max',
    value: number,
): yup.AnySchema => {
    switch (field.type) {
        case 'number':
            return (validator as yup.NumberSchema)[type](value);
        case 'string':
            return (validator as yup.StringSchema)[type](value);
        case 'array':
            return (validator as yup.ArraySchema<yup.AnySchema>)[type](value);
        default:
            return validator;
    }
};

const buildValidationField = (
    field: FormValidationField,
    parentIsOptional = false,
): yup.AnySchema => {
    let validator: yup.AnySchema;

    // If parent is optional, all nested fields are optional
    const isOptional = parentIsOptional || !field.required;

    switch (field.type) {
        case 'string':
            validator = yup.string();
            break;
        case 'number':
            validator = yup.number();
            if (field.positive) {
                validator = (validator as yup.NumberSchema).positive();
            }
            if (field.integer) {
                validator = (validator as yup.NumberSchema).integer();
            }
            break;
        case 'date':
            validator = yup.date();
            break;
        case 'array':
            validator = buildArrayValidation(field, isOptional);
            break;
        case 'object':
            validator = buildObjectValidation(field, isOptional);
            break;
        default:
            validator = yup.mixed();
    }

    if (!isOptional) {
        validator = validator.required(field.message);
    } else {
        validator = validator.optional();
    }

    if (field.min != null) {
        validator = applyMinMaxValidation(validator, field, 'min', field.min);
    }

    if (field.max != null) {
        validator = applyMinMaxValidation(validator, field, 'max', field.max);
    }

    if (field.oneOf) {
        validator = validator.oneOf(field.oneOf);
    }

    if (field.when) {
        validator = validator.when(field.when.field, {
            is: field.when.is,
            then: buildValidationField(field.when.then),
            otherwise: field.when.otherwise
                ? buildValidationField(field.when.otherwise)
                : undefined,
        });
    }

    return validator;
};

export function isFormValidationField(
    value: FormValidation[string],
): value is FormValidationField {
    return 'type' in value && typeof value.type === 'string';
}

export const buildValidationSchema = (
    validation: FormValidation,
): yup.ObjectSchema<Record<string, yup.AnySchema>> => {
    const schema: Record<string, yup.AnySchema> = {};

    for (const [key, value] of Object.entries(validation)) {
        if (isFormValidationField(value)) {
            schema[key] = buildValidationField(value);
        } else {
            schema[key] = yup.object().shape(buildNestedSchema(value));
        }
    }

    return yup.object().shape(schema);
};
