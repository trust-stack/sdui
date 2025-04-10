export type FormItemType = "DATE_TIME_PICKER" | "INPUT_NUMERICAL" | "INPUT_TEXT" | "SELECT" | "SUB_HEADER" | "TOGGLE";


export interface FormItem {
  type: "DATE_TIME_PICKER" | "INPUT_NUMERICAL" | "INPUT_TEXT" | "SELECT" | "SUB_HEADER" | "TOGGLE";
  validationId?: string;
  subHeader?: string;
  inputLabel?: string;
  select?: FormSelect;
  toggle?: FormToggle;
  expanded?: number;
  compact?: number;
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
    items: FormItem1[];
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
export interface FormItem1 {
  type: "DATE_TIME_PICKER" | "INPUT_NUMERICAL" | "INPUT_TEXT" | "SELECT" | "SUB_HEADER" | "TOGGLE";
  validationId?: string;
  subHeader?: string;
  inputLabel?: string;
  select?: FormSelect;
  toggle?: FormToggle;
  expanded?: number;
  compact?: number;
  [k: string]: unknown;
}


export interface FormSection {
  validationId: string;
  title: string;
  items: FormItem[];
  [k: string]: unknown;
}
export interface FormItem {
  type: "DATE_TIME_PICKER" | "INPUT_NUMERICAL" | "INPUT_TEXT" | "SELECT" | "SUB_HEADER" | "TOGGLE";
  validationId?: string;
  subHeader?: string;
  inputLabel?: string;
  select?: FormSelect;
  toggle?: FormToggle;
  expanded?: number;
  compact?: number;
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
export interface FormItem {
  type: "DATE_TIME_PICKER" | "INPUT_NUMERICAL" | "INPUT_TEXT" | "SELECT" | "SUB_HEADER" | "TOGGLE";
  validationId?: string;
  subHeader?: string;
  inputLabel?: string;
  select?: FormSelect;
  toggle?: FormToggle1;
  expanded?: number;
  compact?: number;
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
export interface FormToggle1 {
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


export interface FormValidationItem {
  type: "array" | "date" | "mixed" | "number" | "object" | "string";
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
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
    then: FormValidationItem;
    otherwise?: FormValidationItem;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}


export interface FormValidation {
  /**
   * This interface was referenced by `FormValidation`'s JSON-Schema definition
   * via the `patternProperty` ".*".
   */
  [k: string]:
    | FormValidationItem
    | {
        [k: string]: FormValidationItem;
      };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 */
export interface FormValidationItem {
  type: "array" | "date" | "mixed" | "number" | "object" | "string";
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
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
    then: FormValidationItem;
    otherwise?: FormValidationItem;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}


export interface Form {
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
  type: "DATE_TIME_PICKER" | "INPUT_NUMERICAL" | "INPUT_TEXT" | "SELECT" | "SUB_HEADER" | "TOGGLE";
  validationId?: string;
  subHeader?: string;
  inputLabel?: string;
  select?: FormSelect;
  toggle?: FormToggle;
  expanded?: number;
  compact?: number;
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
    | FormValidationItem
    | {
        [k: string]: FormValidationItem;
      };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 */
export interface FormValidationItem {
  type: "array" | "date" | "mixed" | "number" | "object" | "string";
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
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
    then: FormValidationItem;
    otherwise?: FormValidationItem;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}