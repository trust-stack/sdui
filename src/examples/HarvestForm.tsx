import { FormProvider } from '@truststack/ui-kit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TypeOf } from 'yup';
import { PagerFormBuilder, buildValidationSchema } from '../ui';
import { harvestForm } from './harvest';

// Example Harvest Form
export function HarvestForm() {
    const schema = buildValidationSchema(harvestForm.validation);

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
                formDto={harvestForm}
                onSubmit={() => onSubmit(formMethods.getValues())}
            />
        </FormProvider>
    );
}
