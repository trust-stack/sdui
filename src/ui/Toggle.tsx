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
    ...props
}: ToggleProps<T>) {
    return <></>;
}
