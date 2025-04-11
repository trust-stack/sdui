import { View } from '@truststack/ui-kit';
import { Meta, StoryObj } from '@storybook/react';
import { HarvestForm } from './HarvestForm';
import { PlatformDecorator } from '../storybook-utils';

export default {
    component: HarvestForm,
    decorators: [
        (Story) => (
            <View maxWidth={800}>
                <Story />
            </View>
        ),
    ],
} as Meta<typeof HarvestForm>;

type Story = StoryObj<typeof HarvestForm>;

export const Web: Story = {
    decorators: [PlatformDecorator('web')],
};
