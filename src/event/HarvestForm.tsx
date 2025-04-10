import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TypeOf } from 'yup';
import { FormProvider, buildValidationSchema } from '../ui/form';
import { PagerFormBuilder } from '../ui/pager-form';
import { HarvestForm as HarvestFormDto } from './harvest';

// Example Harvest Form
export function HarvestForm() {
    const schema = buildValidationSchema(HarvestFormDto.validation);

    const formMethods = useForm<TypeOf<typeof schema>>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        criteriaMode: 'all',
        reValidateMode: 'onChange',
    });

    const onSubmit = (data: TypeOf<typeof schema>) => {
        console.log(data);
    };

    return (
        <FormProvider formMethods={formMethods}>
            <PagerFormBuilder<TypeOf<typeof schema>>
                formDto={HarvestFormDto}
                onSubmit={() => onSubmit(formMethods.getValues())}
            />
        </FormProvider>
    );
}
