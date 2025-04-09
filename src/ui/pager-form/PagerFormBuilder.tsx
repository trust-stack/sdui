import { FieldValues } from 'react-hook-form';
import { usePlatform } from '../PlatformContext';
import { Form as FormDto } from 'src/schema/generated';
import { FormContentBuilder } from '../form';
import { PagerForm as Native } from './PagerForm.native';
import { PagerForm as Web } from './PagerForm.web';
import { PagerFormProps } from './types';

export type PagerFormBuilderProps<TFieldValues extends FieldValues> = {
    readonly formDto: FormDto;
} & Omit<PagerFormProps<TFieldValues>, 'forms'>;

export function PagerFormBuilder<TFieldValues extends FieldValues>({
    formDto,
    ...props
}: PagerFormBuilderProps<TFieldValues>) {
    const platform = usePlatform();

    const Component = platform == 'web' ? Web : Native;

    return (
        <Component<TFieldValues>
            forms={formDto.sections.map((section) => ({
                title: section.title,
                content: <FormContentBuilder items={section.items} />,
            }))}
            {...props}
        />
    );
}
