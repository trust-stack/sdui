import { Form as FormDto } from 'src/schema/generated';
import { buildFormItems } from '../form/build-form-items';
import { Form } from '../form/Form';
import { PagerForm } from './PagerForm';

export const buildPagerForm = (form: FormDto) => {
    return (
        <PagerForm
            forms={form.sections.map((section) => ({
                title: section.title,
                content: (
                    <Form.Content>{buildFormItems(section.items)}</Form.Content>
                ),
            }))}
        />
    );
};
