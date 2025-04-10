import { GetProps, Text, styled } from 'tamagui';

const Title = styled(Text, {
    name: 'Title',
    col: '$onSurface',
    fontFamily: '$body',
    variants: {
        size: {
            small: { fontWeight: '500', fontSize: 14, lineHeight: 20 },
            medium: { fontWeight: '500', fontSize: 16, lineHeight: 24 },
            large: { fontWeight: '400', fontSize: 22, lineHeight: 28 },
        },
    } as const,
    defaultVariants: {
        size: 'medium',
    },
});

export type TitleProps = GetProps<typeof Title>;

export { Title };
