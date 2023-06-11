import type { Meta, StoryObj } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import Dropdown from './index';
import { defaultPropsDropdown } from './Dropdown.types';

const meta: Meta<typeof Dropdown> = {
	title: 'Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	args: {
		...defaultPropsDropdown,
	},
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
	args: {
		...defaultPropsDropdown,
	},
	decorators: [centered],
};
