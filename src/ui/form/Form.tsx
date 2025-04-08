import {
    ScrollView,
    Stack,
    View,
    XStack,
    YStack,
    createStyledContext,
    styled,
    withStaticProperties,
} from 'tamagui';
import { FormDateTimePicker } from './FormDateTimePicker';
import { FormInput } from './FormInput';
import { FormNumericalInput } from './FormNumericalInput';
import { FormSelect } from './FormSelect';
import { FormSubmitButton } from './FormSubmitButton';
import { Title as TTitle } from '../typography';

export const DOT_SIZE = 20;
export const TICKER_HEIGHT = 42;

const FormContext = createStyledContext({});

const Frame = styled(YStack, {
    name: 'Form',
    context: FormContext,
    fg: 1,
    gap: 20,
});

const Subheader = styled(TTitle, {
    name: 'FormSubheader',
    context: FormContext,
});

const FormScrollView = styled(ScrollView, {
    name: 'FormScrollView',
    context: FormContext,
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    nestedScrollEnabled: true,
    btrr: '$shape.corner_full',
    btlr: '$shape.corner_full',
    bg: '$background',
});

// Title, top of screen
const TitleBar = styled(XStack, {
    name: 'FormTitleBar',
    context: FormContext,
    ai: 'center',
    gap: '$1',
});

const Title = styled(TTitle, {
    name: 'FormTitle',
    context: FormContext,
    size: 'medium',
    col: '$onSecondaryContainer',
});

const FormContent = styled(Stack, {
    name: 'FormContent',
    gap: '$spacing.form_gap',
});

// Floating actions, bottom screen
const ActionsContainer = styled(XStack, {
    name: 'FormActions',
    context: FormContext,
    jc: 'flex-end',
    alignItems: 'center',
    maw: '100%',
    w: '100%',
    mt: 12,
    fg: 1,
    b: 10,
});

const TickerContainer = styled(View, {
    name: 'FormTicketContainer',
    l: 5,
    ov: 'hidden',
    h: TICKER_HEIGHT,
});

const PaginationContainer = styled(XStack, {
    name: 'FormPaginationContainer',
    context: FormContext,
    ai: 'center',
    gap: '$4',
    px: '$4',
    fg: 1,
});

const PaginationDot = styled(View, {
    name: 'PaginationDot',
    w: DOT_SIZE,
    h: DOT_SIZE,
    br: 100,
});

const FormWideContent = styled(Stack, {
    name: 'FormWideContent',
    mx: '$-4',
    gap: '$2',
});

const FormSection = styled(Stack, {
    name: 'FormSection',
    flexDirection: 'column',
    gap: `$spacing.form_gap`,
    $compact: {
        gap: 8,
    },
});

export const Form = withStaticProperties(Frame, {
    ActionsContainer,
    Content: FormContent,
    Section: FormSection,
    PaginationContainer,
    PaginationDot,
    Props: FormContext.Provider,
    ScrollView: FormScrollView,
    Subheader,
    SubmitButton: FormSubmitButton,
    TickerContainer,
    Title,
    TitleBar,
    WideContent: FormWideContent,
    Input: FormInput,
    NumericalInput: FormNumericalInput,
    Select: FormSelect,
    DateTimePicker: FormDateTimePicker,
});
