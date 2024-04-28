import type { Meta, StoryObj } from '@storybook/react';

import Input from './index';
import { InputProps } from './Input.types';

const storyProps: Partial<InputProps> = {
	name: 'input',
	label: 'Input',
	role: 'default',
	width: '280px',
};

const meta: Meta<typeof Input> = {
	title: 'Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		...storyProps,
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		...storyProps,
	},
};
