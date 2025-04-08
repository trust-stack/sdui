export type Select = {
    readonly label: string;
    readonly options: SelectOption[];
};

type SelectOption = {
    readonly label: string;
    readonly value: string;
};
