import { View, ViewProps, withStaticProperties } from 'tamagui';

type ItemProps = {
    readonly exp?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    readonly compact?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    readonly medium?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    readonly children?: React.ReactNode;
} & ViewProps;

// Placeholder component
function Item({ ...props }: ItemProps) {
    return <></>;
}

// Placeholder component
export const Grid = withStaticProperties(View, {
    Item,
});
