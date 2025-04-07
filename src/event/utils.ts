import { FormValidation, FormValidationItem } from './types';
import * as yup from 'yup';

function isFormValidationItem(
    value: FormValidation[string]
): value is FormValidationItem {
    return (
        'type' in value && typeof (<FormValidationItem>value).type === 'string'
    );
}

export const buildValidationSchema = (
    validation: FormValidation
): yup.ObjectSchema<Record<string, yup.AnySchema>> => {
    const schema: Record<string, yup.AnySchema> = {};

    for (const [key, value] of Object.entries(validation)) {
        if (isFormValidationItem(value)) {
            // Handle direct validation item
            schema[key] = buildValidationField(value);
        } else {
            // Handle nested object validation
            const nestedSchema: Record<string, yup.AnySchema> = {};
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                nestedSchema[nestedKey] = buildValidationField(nestedValue);
            }
            schema[key] = yup.object().shape(nestedSchema);
        }
    }

    return yup.object().shape(schema);
};

const buildValidationField = (field: FormValidationItem): yup.AnySchema => {
    let validator: yup.AnySchema;

    switch (field.type) {
        case 'string':
            validator = yup.string();
            break;
        case 'number':
            validator = yup.number();
            break;
        case 'date':
            validator = yup.date();
            break;
        case 'array':
            validator = yup.array();
            break;
        case 'object':
            validator = yup.object();
            break;
        default:
            validator = yup.mixed();
    }

    if (field.required) {
        validator = validator.required(field.message);
    }

    if (field.min != null) {
        if (field.type === 'number') {
            validator = (validator as yup.NumberSchema).min(field.min);
        } else if (field.type === 'string') {
            validator = (validator as yup.StringSchema).min(field.min);
        } else if (field.type === 'array') {
            validator = (validator as yup.ArraySchema<yup.AnySchema>).min(
                field.min
            );
        }
    }

    if (field.max != null) {
        if (field.type === 'number') {
            validator = (validator as yup.NumberSchema).max(field.max);
        } else if (field.type === 'string') {
            validator = (validator as yup.StringSchema).max(field.max);
        } else if (field.type === 'array') {
            validator = (validator as yup.ArraySchema<yup.AnySchema>).max(
                field.max
            );
        }
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

    if (field.test) {
        validator = validator.test(
            field.test.name,
            field.test.message,
            field.test.test
        );
    }

    return validator;
};
