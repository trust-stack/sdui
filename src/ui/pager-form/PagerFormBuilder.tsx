import { FormProvider, PagerForm } from '@truststack/ui-kit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnySchema, ObjectSchema, TypeOf } from 'yup';
import { PagerForm as PagerFormDto } from 'src/schema/generated';
import { FormContentBuilder, buildValidationSchema } from '../form';

type FormDataType = TypeOf<ObjectSchema<Record<string, AnySchema>>>;

export type PagerFormBuilderProps = {
    readonly formDto: PagerFormDto;
    readonly onSubmit: (data: FormDataType) => void;
    readonly submitting?: boolean;
    readonly loading?: boolean;
};

export function PagerFormBuilder({
    formDto,
    onSubmit,
    submitting,
    loading,
}: PagerFormBuilderProps) {
    const schema = buildValidationSchema(formDto.validation);

    const formMethods = useForm<TypeOf<typeof schema>>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        criteriaMode: 'all',
        reValidateMode: 'onChange',
    });

    return (
        <FormProvider<TypeOf<typeof schema>> formMethods={formMethods}>
            <PagerForm<TypeOf<typeof schema>>
                forms={formDto.sections.map((section) => ({
                    id: section.validationId,
                    title: section.title,
                    content: (
                        <FormContentBuilder<TypeOf<typeof schema>>
                            items={section.items}
                        />
                    ),
                }))}
                onSubmit={() => onSubmit(formMethods.getValues())}
                submitting={submitting}
                loading={loading}
            />
        </FormProvider>
    );
}
