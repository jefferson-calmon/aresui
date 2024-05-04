import type { Meta, StoryObj } from '@storybook/react';

import TextArea, { TextAreaProps } from './index';

const storyProps: TextAreaProps = {
	label: 'TextArea',
	theme: {},
	width: '280px',
};

const meta: Meta<typeof TextArea> = {
	title: 'TextArea',
	component: TextArea,
	tags: ['autodocs'],
	args: {
		...storyProps,
	},
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
	args: {
		...storyProps,
	},
};
