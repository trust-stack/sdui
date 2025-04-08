import { GridItem, Select, Toggle } from '../components';

export type Form = {
    readonly header: FormHeader;
    readonly sections: FormSection[];
    readonly validation: FormValidation;
};

type FormHeader = {
    readonly title: string;
    readonly subHeader?: string;
};

type FormSection = {
    readonly validationId: string;
    readonly title: string;
    readonly items: FormItem[];
};

export type FormItem = {
    readonly type: FormItemType;
    readonly validationId?: string;
    readonly subHeader?: string;
    readonly inputLabel?: string;
    readonly select?: Select;
    readonly toggle?: FormToggle;
} & GridItem;

type FormToggle = {
    // Form items to conditionally display based on a toggle option value
    readonly conditionalItems?: {
        readonly value: string; // Must match one of the parent toggle's option values
        readonly items: FormItem[];
    }[];
} & Toggle;

export type FormValidation = {
    [key: string]:
        | FormValidationItem
        | {
              [key: string]: FormValidationItem;
          };
};

export type FormValidationItem = {
    readonly type: 'array' | 'date' | 'mixed' | 'number' | 'object' | 'string';
    readonly required?: boolean;
    readonly message?: string;
    readonly min?: number;
    readonly max?: number;
    readonly oneOf?: unknown[];
    readonly when?: {
        field: string;
        is: unknown;
        then: FormValidationItem;
        otherwise?: FormValidationItem;
    };
    readonly test?: {
        name: string;
        test: (value: unknown) => boolean | Promise<boolean>;
        message: string;
    };
};

export enum FormItemType {
    DATE_TIME_PICKER = 'DATE_TIME_PICKER',
    NUMERICAL_INPUT = 'NUMERICAL_INPUT',
    SELECT = 'SELECT',
    SUB_HEADER = 'SUB_HEADER',
    TEXT_INPUT = 'TEXT_INPUT',
    TOGGLE = 'TOGGLE',
}
