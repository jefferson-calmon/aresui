import type { Meta, StoryObj } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import Dropdown, { DropdownProps } from './index';

const storyProps: Partial<DropdownProps> = {
	items: [
		{
			id: 'item1',
			content: 'New File',
		},
		{
			id: 'item2',
			content: 'New File with Current Profile',
		},
		{
			id: 'item3',
			content: 'Download As...',
		},
		{
			id: 'item4',
			content: 'Export PDF',
		},
		{
			id: 'item5',
			content: 'Export HTML',
		},
		{
			id: 'item6',
			content: 'Settings',
		},
	],
};

const meta: Meta<typeof Dropdown> = {
	title: 'Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	args: storyProps,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
	args: storyProps,
	decorators: [centered],
};
