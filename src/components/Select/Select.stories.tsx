import type { Meta, StoryObj } from '@storybook/react';

import Select from './index';
import { defaultPropsSelect } from './Select.types';

const meta: Meta<typeof Select> = {
	title: 'Select',
	component: Select,
	tags: ['autodocs'],
	args: {
		...defaultPropsSelect,
	},
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	args: {
		...defaultPropsSelect,
	},
};
