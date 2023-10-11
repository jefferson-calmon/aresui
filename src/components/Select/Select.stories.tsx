import type { Meta, StoryObj } from '@storybook/react';

import Select from './index';
import { defaultPropsSelect, SelectProps } from './Select.types';

const storiesDefaultProps: Partial<SelectProps> = {
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
	defaultOptionByValue: 'example1',
	label: 'Example label',
	width: '280px',
};

const meta: Meta<typeof Select> = {
	title: 'Select',
	component: Select,
	tags: ['autodocs'],
	args: {
		...defaultPropsSelect,
		...storiesDefaultProps,
	},
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	args: {
		...defaultPropsSelect,
		...storiesDefaultProps,
	},
};
