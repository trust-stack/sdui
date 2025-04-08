import { FormValidationItemDto } from './form-validation-item.dto';

export type FormValidation = {
    [key: string]:
        | FormValidationItemDto
        | {
              [key: string]: FormValidationItemDto;
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
