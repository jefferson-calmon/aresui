import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';
import { defaultProps } from './Button.types';

const meta: Meta<typeof Button> = {
	title: 'Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		...defaultProps,
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		...defaultProps,
	},
};
