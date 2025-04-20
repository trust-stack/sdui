export interface PagerForm {
    header: {
        title: string;
        subHeader?: string;
        [k: string]: unknown;
    };
    sections: FormSection[];
    validation: FormValidation;
    [k: string]: unknown;
}
export interface FormSection {
    validationId: string;
    title: string;
    items: FormItem[];
    [k: string]: unknown;
}
export interface FormItem {
    type: 'DATE_TIME_PICKER' | 'INPUT_NUMERICAL' | 'INPUT_TEXT' | 'SELECT' | 'SUB_HEADER' | 'TOGGLE';
    validationId?: string;
    subHeader?: string;
    inputLabel?: string;
    select?: FormSelect;
    toggle?: FormToggle;
    expanded?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    compact?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    [k: string]: unknown;
}
export interface FormSelect {
    options: {
        label: string;
        value: string;
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
}
export interface FormToggle {
    /**
     * @minItems 2
     */
    options: [
        {
            label: string;
            value: string;
            [k: string]: unknown;
        },
        {
            label: string;
            value: string;
            [k: string]: unknown;
        },
        ...{
            label: string;
            value: string;
            [k: string]: unknown;
        }[]
    ];
    conditionalItems?: {
        /**
         * Must match one of the toggle's option values
         */
        value: string;
        items: FormItem[];
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
}
export interface FormValidation {
    /**
     * This interface was referenced by `FormValidation`'s JSON-Schema definition
     * via the `patternProperty` ".*".
     */
    [k: string]:
        | FormValidationField
        | {
              [k: string]: FormValidationField;
          };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 */
export interface FormValidationField {
    type: 'array' | 'date' | 'mixed' | 'number' | 'object' | 'string';
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    /**
     * Validates that the value is a positive number
     */
    positive?: boolean;
    /**
     * Validates that the value is an integer
     */
    integer?: boolean;
    oneOf?: (
        | string
        | number
        | boolean
        | {
              [k: string]: unknown;
          }
        | unknown[]
        | null
    )[];
    /**
     * Schema for array items when type is 'array'
     */
    of?:
        | FormValidationField
        | {
              [k: string]: FormValidationField;
          };
    /**
     * Schema for object properties when type is 'object'
     */
    shape?: {
        /**
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` ".*".
         */
        [k: string]:
            | FormValidationField
            | {
                  [k: string]: FormValidationField;
              };
    };
    when?: {
        field: string;
        /**
         * Value to compare field against
         */
        is:
            | string
            | number
            | boolean
            | {
                  [k: string]: unknown;
              }
            | unknown[]
            | null;
        then: FormValidationField;
        otherwise?: FormValidationField;
        [k: string]: unknown;
    };
    [k: string]: unknown;
}