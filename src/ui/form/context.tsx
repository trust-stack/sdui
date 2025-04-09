import { Context, createContext, useContext } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type FormContextProps<TFieldValues extends FieldValues> = ReturnType<
    typeof useForm<TFieldValues>
> & {
    readonly submitHandler: SubmitHandler<TFieldValues>;
    readonly submitting?: boolean;
    readonly disabled?: boolean;
};

const FormContext = createContext<FormContextProps<any> | null>(null);

export const useFormContext = <TFieldValues extends FieldValues>() => {
    const context = useContext(
        FormContext as Context<FormContextProps<TFieldValues> | null>,
    );

    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

type FormProviderProps<TFieldValues extends FieldValues> = {
    readonly children: React.ReactNode;
    readonly formMethods: ReturnType<typeof useForm<TFieldValues>>;
    readonly submitHandler?: SubmitHandler<TFieldValues>;
    readonly submitting?: boolean;
    readonly disabled?: boolean;
};

export function FormProvider<TFieldValues extends FieldValues>({
    children,
    formMethods,
    submitHandler = () => {},
    submitting = false,
    disabled,
}: FormProviderProps<TFieldValues>) {
    return (
        <FormContext.Provider
            value={{ ...formMethods, submitHandler, submitting, disabled }}
        >
            {children}
        </FormContext.Provider>
    );
}
