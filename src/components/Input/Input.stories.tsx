import type { Meta, StoryObj } from '@storybook/react';

import Input from './index';
import { defaultPropsInput, InputProps } from './Input.types';

const storiesDefaultProps: Partial<InputProps> = {
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
		...defaultPropsInput,
		...storiesDefaultProps,
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		...defaultPropsInput,
		...storiesDefaultProps,
	},
};
