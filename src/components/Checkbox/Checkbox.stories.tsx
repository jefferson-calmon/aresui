import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './index';

const meta: Meta<typeof Checkbox> = {
	title: 'Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	args: {},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {},
};
