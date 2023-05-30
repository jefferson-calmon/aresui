import type { Meta, StoryObj } from '@storybook/react';

import Input from './index';
import { defaultPropsInput } from './Input.types';

const meta: Meta<typeof Input> = {
	title: 'Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		...defaultPropsInput,
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		...defaultPropsInput,
	},
};
