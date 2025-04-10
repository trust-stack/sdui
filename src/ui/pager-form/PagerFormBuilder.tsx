import { FieldValues, Path } from 'react-hook-form';
import { Form as FormDto } from 'src/schema/generated';
import { FormContentBuilder } from '../form';
import { PagerForm } from './PagerForm';
import { PagerFormProps } from './types';

export type PagerFormBuilderProps<TFieldValues extends FieldValues> = {
    readonly formDto: FormDto;
} & Omit<PagerFormProps<TFieldValues>, 'forms'>;

export function PagerFormBuilder<TFieldValues extends FieldValues>({
    formDto,
    ...props
}: PagerFormBuilderProps<TFieldValues>) {
    return (
        <PagerForm<TFieldValues>
            forms={formDto.sections.map((section) => ({
                id: section.validationId as Path<TFieldValues>,
                title: section.title,
                content: <FormContentBuilder items={section.items} />,
            }))}
            {...props}
        />
    );
}
