export type SelectProps<T extends string = string> = {
    readonly options: {
        label: string;
        value: T;
    }[];
    readonly value: T;
    readonly onChange: (value: T) => void;
};

// TODO: Implement placeholder component
export function Select<T extends string = string>({
    ...props
}: SelectProps<T>) {
    return <></>;
}
