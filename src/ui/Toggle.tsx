export type ToggleProps<T extends string = string> = {
    readonly options: {
        label: string;
        value: T;
    }[];
    readonly value: T;
    readonly onChange: (value: T) => void;
};

// TODO: Implement placeholder component
export function Toggle<T extends string = string>({
    options,
    ...props
}: ToggleProps<T>) {
    return <RadioGroup<T> items={options} {...props} />;
}

// TODO: Implement placeholder component
type RadioGroupProps<T extends string = string> = {
    items: {
        label: string;
        value: T;
    }[];
};

function RadioGroup<T extends string = string>({
    ...props
}: RadioGroupProps<T>) {
    return <></>;
}
