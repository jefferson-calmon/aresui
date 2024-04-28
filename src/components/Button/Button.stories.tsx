/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta: Meta<typeof Button> = {
	title: 'Button',
	component: Button,
	tags: ['autodocs'],
	args: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {},
};
