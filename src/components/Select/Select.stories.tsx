import type { Meta, StoryObj } from '@storybook/react';

import Select from './index';
import { SelectProps } from './Select.types';

const storyProps: Partial<SelectProps> = {
	options: [
		{
			label: 'Example item 1',
			value: 'example1',
		},
		{
			label: 'Example item 2',
			value: 'example2',
		},
	],
	label: 'Select',
	width: '280px',
};

const meta: Meta<typeof Select> = {
	title: 'Select',
	component: Select,
	tags: ['autodocs'],
	args: {
		...storyProps,
	},
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	args: {
		...storyProps,
	},
};
