import { FieldValues, Path } from 'react-hook-form';
import { ReactNode } from 'react';

export type PagerFormProps<TFieldValues extends FieldValues> = {
    readonly forms: PageFormProps<TFieldValues>[];
    readonly onSubmit?: VoidFunction;
    readonly submitting?: boolean;
    readonly loading?: boolean;
};

export type PageFormProps<TFieldValues extends FieldValues> = {
    title: string;
    content: ReactNode | (() => ReactNode);
    id?: Path<TFieldValues> | Path<TFieldValues>[];
    hidden?: boolean;
};
