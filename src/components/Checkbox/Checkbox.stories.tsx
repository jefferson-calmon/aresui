import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './index';
import { defaultPropsCheckbox } from './Checkbox.types';

const meta: Meta<typeof Checkbox> = {
	title: 'Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	args: {
		...defaultPropsCheckbox,
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		...defaultPropsCheckbox,
	},
};
