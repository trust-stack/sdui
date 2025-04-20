import { Meta, StoryObj } from '@storybook/react';
import { View } from '@truststack/ui-kit';
import { PagerForm as PagerFormDto } from 'src/schema/generated';
import data from '../example.schema.json';
import { PagerFormBuilder } from './PagerFormBuilder';

export default {
    component: PagerFormBuilder,
    decorators: [
        (Story) => (
            <View maxWidth={800}>
                <Story />
            </View>
        ),
    ],
    args: {
        formDto: data as PagerFormDto,
    },
} as Meta<typeof PagerFormBuilder>;

type Story = StoryObj<typeof PagerFormBuilder>;

export const Web: Story = {};
