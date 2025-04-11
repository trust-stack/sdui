import { Meta, StoryObj } from '@storybook/react';
import { HarvestForm } from './HarvestForm';
import { PlatformDecorator } from '../storybook-utils';

export default {
    component: HarvestForm,
} as Meta<typeof HarvestForm>;

type Story = StoryObj<typeof HarvestForm>;

export const Web: Story = {
    decorators: [PlatformDecorator('web')],
};
