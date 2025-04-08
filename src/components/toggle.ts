export type Toggle = {
    readonly options: ToggleOption[];
};

type ToggleOption = {
    readonly label: string;
    readonly value: string;
};
