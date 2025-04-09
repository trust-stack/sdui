import {
    Stack,
    YStack,
    createStyledContext,
    styled,
    withStaticProperties,
} from 'tamagui';
import { Title as TTitle } from '../typography';
import { FormDateTimePicker } from './FormDateTimePicker';
import { FormInput } from './FormInput';
import { FormNumericalInput } from './FormNumericalInput';
import { FormSelect } from './FormSelect';
import { FormSubmitButton } from './FormSubmitButton';
import { FormToggle } from './FormToggle';

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

const FormContent = styled(Stack, {
    name: 'FormContent',
    gap: '$spacing.form_gap',
});

// TODO: Implement placeholder component
export const Form = withStaticProperties(Frame, {
    Content: FormContent,
    Props: FormContext.Provider,
    Subheader,
    DateTimePicker: FormDateTimePicker,
    Input: FormInput,
    NumericalInput: FormNumericalInput,
    Select: FormSelect,
    SubmitButton: FormSubmitButton,
    Toggle: FormToggle,
});
