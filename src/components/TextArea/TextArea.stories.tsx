import type { Meta, StoryObj } from '@storybook/react';

import TextArea from './index';
import { defaultPropsTextArea } from './TextArea.types';

const meta: Meta<typeof TextArea> = {
	title: 'TextArea',
	component: TextArea,
	tags: ['autodocs'],
	args: {
		...defaultPropsTextArea,
	},
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
	args: {
		...defaultPropsTextArea,
	},
};
