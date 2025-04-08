import { GetProps, H1, Text, styled } from 'tamagui';

const Hero = styled(H1, {
    name: 'Hero',
    col: '$onSurface',
    fontFamily: '$heading',
    variants: {
        size: {
            medium: { fontWeight: '400', fontSize: 96, lineHeight: 96 },
            small: { fontWeight: '400', fontSize: 80, lineHeight: 88 },
        },
    } as const,
    defaultVariants: {
        size: 'medium',
    },
});

const Display = styled(Text, {
    name: 'Display',
    col: '$onSurface',
    fontFamily: '$heading',
    variants: {
        size: {
            small: { fontWeight: '400', fontSize: 36, lineHeight: 44 },
            medium: { fontWeight: '400', fontSize: 45, lineHeight: 52 },
            large: { fontWeight: '400', fontSize: 57, lineHeight: 64 },
        },
    } as const,
    defaultVariants: {
        size: 'medium',
    },
});

const Headline = styled(Text, {
    name: 'Headline',
    col: '$onSurface',
    fontFamily: '$heading',
    variants: {
        size: {
            small: { fontWeight: '400', fontSize: 24, lineHeight: 32 },
            medium: { fontWeight: '400', fontSize: 28, lineHeight: 36 },
            large: { fontWeight: '400', fontSize: 32, lineHeight: 40 },
        },
    } as const,
    defaultVariants: {
        size: 'medium',
    },
});

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

const Body = styled(Text, {
    name: 'Body',
    col: '$onSurface',
    variants: {
        size: {
            small: { fontWeight: '400', fontSize: 12, lineHeight: 16 },
            medium: { fontWeight: '400', fontSize: 14, lineHeight: 20 },
            large: { fontWeight: '400', fontSize: 16, lineHeight: 24 },
        },
    } as const,
    defaultVariants: {
        size: 'medium',
    },
});

const Label = styled(Text, {
    name: 'Label',
    col: '$onSurface',
    variants: {
        size: {
            small: { fontWeight: '500', fontSize: 11, lineHeight: 16 },
            medium: { fontWeight: '500', fontSize: 12, lineHeight: 16 },
            large: { fontWeight: '500', fontSize: 14, lineHeight: 20 },
        },
    } as const,
    defaultVariants: {
        size: 'medium',
    },
});

export type BodyProps = GetProps<typeof Body>;
export type DisplayProps = GetProps<typeof Display>;
export type HeadlineProps = GetProps<typeof Headline>;
export type HeroProps = GetProps<typeof Hero>;
export type LabelProps = GetProps<typeof Label>;
export type TitleProps = GetProps<typeof Title>;

export { Body, Display, Headline, Hero, Label, Title };
